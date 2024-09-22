import { Injectable } from "@angular/core";
import { JwtDecoderService } from "./jwt-decoder.service";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { filter } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class InitialAuthService{
    private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() {
      return this._decodedAccessToken;
    }
    get decodedIDToken() {
      return this._decodedIDToken;
    }
    constructor(
        private oAuthService: OAuthService,
        private oAuthConfig:AuthConfig,
        private jwtDecoder:JwtDecoderService
    ){}
    async initAuth(): Promise<any> {
        return new Promise<void>((resolve, reject) => {
        // setup oauthService
        this.oAuthService.configure(this.oAuthConfig);
        this.oAuthService.setStorage(sessionStorage);
        this.oAuthService.setupAutomaticSilentRefresh();
        
        // subscribe to token events
        this.oAuthService.events
        .pipe(filter((e: any) => e.type === 'token_received'))
        .subscribe(() => this.handleNewToken());
        
        // continue initializing app (provoking a token_received event) or redirect to login-page
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then((isLoggedIn) => {
                if (isLoggedIn) {
                    resolve();
                } else {
                    this.oAuthService.initCodeFlow();
                    reject();
                }
            });

    });
    }
    private handleNewToken() {
        this._decodedAccessToken = this.jwtDecoder.decodeToken(this.oAuthService.getAccessToken());
        this._decodedIDToken = this.jwtDecoder.decodeToken(this.oAuthService.getIdToken());
        sessionStorage.setItem('access_token',this.oAuthService.getAccessToken());
        let roles = this._decodedAccessToken.authorities.toString();
        let userId = this._decodedAccessToken.userId.toString();
        sessionStorage.setItem('userId',userId);
        let userName = this._decodedAccessToken.user.toString();
        sessionStorage.setItem('userName',userName);
        //console.log(roles);
        if(roles.includes('User')){
            sessionStorage.setItem('role',roles);
        }
    }
}
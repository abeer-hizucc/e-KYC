import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private oAuthService: OAuthService
  ) {}
  isAuthenticated():boolean{
   return this.oAuthService.hasValidAccessToken();
  }
  login(){
    this.oAuthService.initLoginFlow();
  }
  logout(){
    this.oAuthService.logOut();   
  }
}
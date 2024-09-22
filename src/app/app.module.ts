import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardComponentModule } from './dashboard/dashboard.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationService } from './Services/authorzation/authenticate.service';
import { InitialAuthService } from './Services/authorzation/initial-auth.service';
import { AuthInterceptorService } from './Services/authorzation/intercept.service';
import { JwtDecoderService } from './Services/authorzation/jwt-decoder.service';
import { authCodeFlowConfig } from './shared/authorization/authorize.config';
import { LocationStrategy,  PathLocationStrategy } from '@angular/common';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    MaterialModule,
    DashboardComponentModule,
    FooterComponent,
    HeaderComponent,
    OAuthModule.forRoot(
    )
    ],
  providers: [
    AuthenticationService,
    InitialAuthService,
    OAuthService,
    JwtDecoderService,
    {provide:AuthConfig, useValue: authCodeFlowConfig},
    {
      provide: APP_INITIALIZER,
      useFactory: (initialAuthService:InitialAuthService)=>()=>initialAuthService.initAuth(),
      deps: [InitialAuthService],
      multi: true,
    },
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true},
    {provide:LocationStrategy, useClass:PathLocationStrategy},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

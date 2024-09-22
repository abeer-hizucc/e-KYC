import { AuthConfig} from "angular-oauth2-oidc";
import { AppConfig } from "../app.config";

export const authCodeFlowConfig:AuthConfig = {
    issuer: `${AppConfig.backendAuthorizationIssuer}`,
    redirectUri: window.location.origin+'/status/user',
    clientId: `${AppConfig.clientId}`,
    responseType: 'code',
    scope: `${AppConfig.scope}`,
    showDebugInformation: true,
    requireHttps: false,
    postLogoutRedirectUri: window.location.origin + '/dashboard',
    
}
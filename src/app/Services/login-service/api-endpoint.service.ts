import { Injectable } from "@angular/core";

@Injectable()
export class ApiEndpointService{
    APIENDPOINTURL:string= "http://103.41.111.51:9001/api";
    private loginURL = this.APIENDPOINTURL+"/user/login";
    getLoginUrl(){
        return this.loginURL;
    }
}
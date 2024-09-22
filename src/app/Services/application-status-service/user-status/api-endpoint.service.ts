import { Injectable } from "@angular/core";

@Injectable()
export class UserStatusApiEndpointService{
    APIENDPOINTURL:string= "http://103.41.111.51:9001/api";
    private userAppicationStatus = this.APIENDPOINTURL+"/application/status/";
    getUserApplicationStatusUrl(){
        return this.userAppicationStatus;
    }
}
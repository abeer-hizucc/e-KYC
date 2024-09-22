import { Injectable } from "@angular/core";

@Injectable()
 export class ProfileAPIEndPointService{
    getCheckPasswordURL() {
        return this.checkPassword;
    }
    APIENDPOINT = "http://103.41.111.51:9001/api";
    private userProfile = this.APIENDPOINT + "/user";
    private userDocument = this.APIENDPOINT + "/document";
    private checkPassword = this.APIENDPOINT + "/user/password/check";
    getUserProfileURL(){
        return this.userProfile;
    }
    getUserDocumentURL(){
        return this.userDocument;
    }
 }
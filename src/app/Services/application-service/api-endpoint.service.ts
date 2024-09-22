import { Injectable } from "@angular/core";

@Injectable()
export class ApplicationAPIEndpoint {
APIENDPOINT = "http://103.41.111.51:9001/api";
//api 4.2.1
private individualApplicationUpload = this.APIENDPOINT + "/application/individual/";
//api 4.2.2
private organizationApplicationUpload = this.APIENDPOINT + "/application/organization/";
//api 2.1
private documentUpload =  this.APIENDPOINT + "/document";
//api 3.1
private userinfo = this.APIENDPOINT + "/user";
getDocumentUploadUrl() {
    return this.documentUpload;
  }
  getIndividualApplicationUploadUrl() {
    return this.individualApplicationUpload;
  }
  getOrganizationApplicationUploadUrl() {
    return this.organizationApplicationUpload;
  }
  getUserInfoUrl(){
    return this.userinfo;
  }
}
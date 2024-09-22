import { Injectable } from "@angular/core";

@Injectable()
export class RegistrationAPIEndpoint {
  APIENDPOINT = "http://103.41.111.51:9001/api";
  private step2NIDInfoUpload = this.APIENDPOINT + "/nid/ocr";
  private step3NIDInfoRequest = this.APIENDPOINT + "/nid/fetch/v1";
  private userregistration = this.APIENDPOINT + "/user";
  private documentUpload = this.APIENDPOINT + "/document";
  getNIDInfoUploadUrl() {
    return this.step2NIDInfoUpload;
  }
  getNIDInfoRequestUrl() {
    return this.step3NIDInfoRequest;
  }
  getUserRegistrationUrl() {
    return this.userregistration;
  }
  getDocumentUploadUrl() {
    return this.documentUpload;
  }
}
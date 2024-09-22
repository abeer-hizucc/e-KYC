import { Injectable } from "@angular/core";

@Injectable()
export class VerifyEmailAPIEndpoint {
  APIENDPOINT = "http://103.41.111.51:9001/api/application/";
  private sendOTP = this.APIENDPOINT + "register";
  private verifyOTP = this.APIENDPOINT + "verify";
 
    getSendOTPUrl() {
        return this.sendOTP;
    }
    getVerifyOTPUrl() {
        return this.verifyOTP;
    }
}
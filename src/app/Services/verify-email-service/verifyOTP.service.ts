import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { VerifyEmailAPIEndpoint } from "./api-endpoint.service";
import { VerifyOTPRequestModel, VerifyOTPResponseModel } from "src/app/models/verify-email-models/verifyOTP.model";
import { Observable, catchError, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authorzation/authenticate.service";

@Injectable()
export class VerifyOTPService {
    constructor(
        private matSnackBar: MatSnackBar,
        private apiEndpoint: VerifyEmailAPIEndpoint,
        private http: HttpClient,
        private router: Router,
        private oAuthService:AuthenticationService
    ) { }
    /*
    status: 1 = OTP hasbeen verified successfully
    status: 2 = User already verified the OTP
    status: 3 = OTP did not match
    status: 4 = User Id does not exist in the DB
    */ 
    verifyOTP(VerifyOTPRequest: VerifyOTPRequestModel):Observable<boolean> {
    const apiURL = this.apiEndpoint.getVerifyOTPUrl();
       return  this.http.post<VerifyOTPResponseModel>(apiURL,VerifyOTPRequest)
            .pipe(
                map((response:VerifyOTPResponseModel) => {
                    if (response.status === 1) { 
                        this.matSnackBar.open('OTP Verified Successfully. Redirecting to Login Page', 'Close', {
                            duration: 3000,
                            panelClass: ['mat-snack-bar-success', 'mat-snackbar-size']
                        });
                        setInterval(() => {
                            this.oAuthService.login();
                        },3000)
                        return true;
                    } 
                    return false;}),
                    catchError((error:VerifyOTPResponseModel) => {
                        if (error.status === 2) { 
                            this.matSnackBar.open('User Already Verified The Email', 'Close', {
                                duration: 5000,
                                panelClass: ['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                            console.log('Error Verifying OTP', error);
                            return of (false);
                        }
                        else if(error.status === 3) {
                            this.matSnackBar.open(error.message, 'Close', {
                                duration: 5000,
                                panelClass: ['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                            console.log('OTP did not match', error);
                            return of (false);
                        }
                        else if(error.status === 4) {
                            this.matSnackBar.open(error.message, 'Close', {
                                duration: 5000,
                                panelClass: ['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                            console.log('User Id does not exist in the DB', error);
                            return of (false);
                        }
                        else {
                            this.matSnackBar.open('Unknown Error Verifying OTP', 'Close', {
                                duration: 5000,
                                panelClass: ['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                            console.log('Unknown Error Verifying OTP', error);
                            return of (false);
                        }
                    })
                
            );
    }

}
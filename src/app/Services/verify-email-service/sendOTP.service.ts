import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { sendOTPRequestModel } from "src/app/models/verify-email-models/sendOTP.model";
import { VerifyEmailAPIEndpoint } from "./api-endpoint.service";
import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { VerifyOTPRequestModel } from "src/app/models/verify-email-models/verifyOTP.model";
import { Router } from "@angular/router";


@Injectable()
export class SendOTPService {
    constructor(
        private matSnackBar: MatSnackBar,
        private apiEndpoint: VerifyEmailAPIEndpoint,
        private http: HttpClient,
        private router:Router
    ) { }
    sendOTPToEmail(sendOTPRequest: sendOTPRequestModel): Observable<boolean> {
        return this.http.post<HttpResponse<any>>(
          this.apiEndpoint.getSendOTPUrl(),
          sendOTPRequest,
          { observe: 'response' }
        ).pipe(
          map(response => {
            if (response.status === HttpStatusCode.Created) {
              this.matSnackBar.open('OTP has been sent to the Email', 'Close', {
                duration: 5000,
                panelClass: ['mat-snack-bar-success', 'mat-snackbar-size'],
              });
              return true;
            }
            return false;
          }),
          catchError(error => {
            if (error instanceof HttpResponse && error.status === HttpStatusCode.BadRequest) {
              this.matSnackBar.open('Email could not be sent', 'Close', {
                duration: 5000,
                panelClass: ['mat-snack-bar-error', 'mat-snackbar-size'],
              });
              console.log('Error sending Email:', error);
              return of(false); 
            }
      
            
            console.error('Unexpected error:', error);
            return of(false); 
          })
        );
      }
      
}
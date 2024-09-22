import { Injectable } from "@angular/core";
import { ProfileAPIEndPointService } from "./api-endpoint.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { CheckPasswordResponseModel } from "src/app/models/profile-models/profile.model";
import { MatSnackBar } from "@angular/material/snack-bar";



@Injectable()
export class CheckPasswordService {
    constructor(
        private apiUrl: ProfileAPIEndPointService,
        private http: HttpClient,
        private snakcBar:MatSnackBar
    ) {}

    
    isValidPassword(password: string, userId: number): Observable<boolean> {
      const url = this.apiUrl.getCheckPasswordURL();
      const data = {
        password: password,
        userId: userId
      };
    
      return this.http.post<CheckPasswordResponseModel>(url, data).pipe(
        map((response: CheckPasswordResponseModel) => {
          if(!response.validPassword){
            this.snakcBar.open('Invalid Password Inserted', 'Close', {
              duration: 3000,
              panelClass: ['mat-snack-bar-error','mat-snackbar-size']
            });
          }else{
            this.snakcBar.open('Password is valid', 'Close', {
              duration: 3000,
              panelClass: ['mat-snack-bar-success','mat-snackbar-size']
            });
          
          }
          return response.validPassword;
        }),
        catchError(error => {
          this.snakcBar.open('Error In Checking Password', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-error','mat-snackbar-size']
          });
          console.error('Error checking password validity', error);
          return of(false);
        })
      );
    }
    
  
}

import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserInfoModel } from 'src/app/models/registration-models/user-info.model';
import { UserRegistrationService } from './User-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveUserInfoService } from './User-Info-Save.service';
import { first } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';


@Injectable()
export class UserCreationService {
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private userRegistrationService: UserRegistrationService,
    private snackBar: MatSnackBar,
    private saveUserInfoService:SaveUserInfoService
  ) {}
  createUserInBackend(userInfo: UserInfoModel) {
    sessionStorage.setItem('userName', userInfo.userName as string);
    this.userRegistrationService.registerUserInfo(userInfo).pipe(first()).subscribe(
      {
        next:(response)=>{
        sessionStorage.setItem("userId",response.userId); 
        console.log("User id",response.userId);
        const isCompleted = true;
        this.onFormCompletion.emit(isCompleted);
        // this.saveUserInfoService.clearRegistrationForm();
        this.createSuccessSnackBar('OTP has been sent to your Email');
        // this.router.navigate(['status/user',response.userId]);
        
        this.onFormCompletion.emit(true);
        },
        error:(err:HttpErrorResponse)=>{
          console.log('User Info not sent: ERROR:', err.message);
          if(err.status === HttpStatusCode.Conflict){
            this.createErrorSnackBar('User Already Registered with same NID');
          }
          else if(err.status === HttpStatusCode.InternalServerError){
            this.createErrorSnackBar('Something Went Wrong');
          }
          else if(err.status === HttpStatusCode.ServiceUnavailable){
            this.createErrorSnackBar('Server is Down');
          }
          else{
            this.createErrorSnackBar('Server is Down. Try Again Later')
          }
      }
    }
    );
    
  }
  createSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Display for 3 seconds
      panelClass: ['mat-snack-bar-success','mat-snackbar-size'], 
    });
  }
  createErrorSnackBar(message:string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Display for 3 seconds
      panelClass: ['mat-snack-bar-error','mat-snackbar-size'], 
    });
  }
}

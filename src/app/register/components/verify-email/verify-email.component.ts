import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { sendOTPRequestModel } from "src/app/models/verify-email-models/sendOTP.model";
import { VerifyOTPRequestModel } from "src/app/models/verify-email-models/verifyOTP.model";
import { SaveUserInfoService } from "src/app/Services/registration-service/User-Info-Save.service";
import { SendOTPService } from "src/app/Services/verify-email-service/sendOTP.service";
import { VerifyOTPService } from "src/app/Services/verify-email-service/verifyOTP.service";
import { AppConfig } from "src/app/shared/app.config";

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit,OnDestroy{
    emailForm!:FormGroup;
    sendOTPObj!:sendOTPRequestModel;
    verifyOTPObj!:VerifyOTPRequestModel;
    isSpinnerSpinning:boolean = false;
    isOTPSent:boolean = false;
    isOTPVerifiedSpinner:boolean = false;
    constructor(
        private formBuilder:FormBuilder,
        private sendOTPService:SendOTPService,
        private verifyOTPService:VerifyOTPService,
        private saveUserInfoService:SaveUserInfoService
       
    ){}
    ngOnInit(): void {
        
        this.emailForm = this.formBuilder.group({
           
            otp:['',Validators.required,Validators.minLength(AppConfig.OTPLength),Validators.maxLength(AppConfig.OTPLength)]
        });
    }
    sendOTP(){
        this.isSpinnerSpinning = true;
        this.sendOTPObj ={
            email:this.emailForm?.get('email')?.value as string
        }
       this.sendOTPService.sendOTPToEmail(this.sendOTPObj).subscribe(
        (res)=>{
            this.isSpinnerSpinning = false;
            if(res){
                this.isOTPSent = true;
                
            }
        }
       );
    }
    SubmitOTP(){
        this.isOTPVerifiedSpinner = true;
        this.verifyOTPObj ={
            email:this.saveUserInfoService.getRegistrationForm()?.email as string,
            otp:this.emailForm?.get('otp')?.value as string
        }
        console.log(this.verifyOTPObj);
        this.verifyOTPService.verifyOTP(this.verifyOTPObj).subscribe(
            (res)=>{
               this.isOTPVerifiedSpinner = false;
               this.saveUserInfoService.clearRegistrationForm();
            }
        );
    }
   ngOnDestroy(): void {
      
   }
}
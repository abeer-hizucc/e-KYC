import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SendOTPService } from "src/app/Services/verify-email-service/sendOTP.service";
import { VerifyOTPService } from "src/app/Services/verify-email-service/verifyOTP.service";
import { AppConfig } from "src/app/shared/app.config";
import { sendOTPRequestModel } from "src/app/models/verify-email-models/sendOTP.model";
import { VerifyOTPRequestModel } from "src/app/models/verify-email-models/verifyOTP.model";
@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit,OnDestroy{
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
       
    ){}
    ngOnInit(): void {
        
        this.emailForm = this.formBuilder.group({
            email:['',Validators.required,Validators.email],
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
            email:this.emailForm?.get('email')?.value as string,
            otp:this.emailForm?.get('otp')?.value as string
        }
        this.verifyOTPService.verifyOTP(this.verifyOTPObj).subscribe(
            (res)=>{
               this.isOTPVerifiedSpinner = false;
            }
        );
    }
   ngOnDestroy(): void {
      
   }
}
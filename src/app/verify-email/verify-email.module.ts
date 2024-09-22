import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MaterialModule } from "../material/material.module"
import { VerifyEmailRoutingModule } from "./verify-email-routing.module"
import { OTPComponent } from "./components/otp.component"
import { RouterModule, Routes } from "@angular/router"
import { SendOTPService } from "../Services/verify-email-service/sendOTP.service"
import { VerifyOTPService } from "../Services/verify-email-service/verifyOTP.service"
import { VerifyEmailAPIEndpoint } from "../Services/verify-email-service/api-endpoint.service"

export const OTPComponents = [
    OTPComponent
]
export const OTPServices=[
    SendOTPService,
    VerifyOTPService,
    VerifyEmailAPIEndpoint
]

@NgModule(
    {
        declarations: [
            OTPComponents
        ],
        imports: [
            CommonModule,
            MaterialModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule,
            VerifyEmailRoutingModule
        ],
        exports: [
            OTPComponents
        ],
        providers: [
            OTPServices
        ]
    }
)
export class VerifyEmailModule {

}
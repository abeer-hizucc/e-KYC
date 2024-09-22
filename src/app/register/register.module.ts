import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import { ConfirmationInfoComponent } from "./components/confirmation-info/confirmation-info.component";
import { NidUploadComponent } from "./components/nid-upload/nid-upload.component";
import { PasswordComponent } from "./components/password/password.component";
import { PhotoUploadComponent } from "./components/photo-upload/photo-upload.component";
import { RegisterComponent } from "./components/register.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";
import { GivenNsurnameService } from "src/app/Services/miscellaneous-service/givenNsurname.service";
import { SaveUserInfoService } from "src/app/Services/registration-service/User-Info-Save.service";
import { UserRegistrationService } from "src/app/Services/registration-service/User-registration.service";
import { RegistrationAPIEndpoint } from "src/app/Services/registration-service/api-endpoint.service";
import { ConfirmInfoService } from "src/app/Services/registration-service/confirm-info.service";
import { DocumentUploadService } from "src/app/Services/registration-service/document-upload.service";

import { NidCallService } from "src/app/Services/registration-service/nid-call.service";
import { NIDAndDOBService } from "src/app/Services/registration-service/nid-front-cover-response.service";
import { NidServerResponseService } from "src/app/Services/registration-service/nid-server-response.service";
import { RegisterRoutingModule } from "./register-routing.module";
import { UserCreationService } from "../Services/registration-service/User-creation.service";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { VerifyEmailAPIEndpoint } from "../Services/verify-email-service/api-endpoint.service";
import { SendOTPService } from "../Services/verify-email-service/sendOTP.service";
import { VerifyOTPService } from "../Services/verify-email-service/verifyOTP.service";



export const RegisterComponents = [
    RegisterComponent,
    NidUploadComponent,
    RegistrationFormComponent,
    PhotoUploadComponent,
    PasswordComponent,
    ConfirmationInfoComponent,
    VerifyEmailComponent
]
export const RegistrationServices=[
    NIDAndDOBService,
    SaveUserInfoService,
    RegistrationAPIEndpoint,
    NidCallService,
    NidServerResponseService,
    ConfirmInfoService,
    GivenNsurnameService,
    UserRegistrationService,
    DocumentUploadService,
    UserCreationService,
    SendOTPService,
    VerifyOTPService,
    VerifyEmailAPIEndpoint
]

@NgModule(
    {
        declarations: [
            RegisterComponents
        ],
        imports: [
            CommonModule,
            MaterialModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            RegisterRoutingModule
        ],
        exports: [
            RegisterComponents
        ],
        providers: [
            RegistrationServices
        ]
    }
)
export class RegisterModule {

}
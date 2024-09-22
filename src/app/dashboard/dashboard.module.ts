import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { ApplicationFormComponent } from "./applications/application-form/application-form.component";
import { ApplicationTypeComponent } from "./applications/application-type/application-type.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { OrganizationDetailsComponent } from "./applications/organization-details/organization-details.component";
import { OtherDocumentsComponent } from "./applications/other-documents/other-documents.component";
import { ResidentialAddressComponent } from "./applications/residential-address/residential-address.component";
import { VerificationDocumentUploadComponent } from "./applications/verification-document-upload/verification-document-upload.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";

import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule } from "@angular/router";

import { GetDocumentService } from "../Services/profile-service/get-documents.service";
import { OrganizationalDocumentComponent } from "./applications/organizational-document/organizational-document.component";
import { OrganizationTypeService } from "../Services/application-service/organization-type.service";
import { OrganizationApplicationService } from "../Services/application-service/organization-application.service";
import { ApplicationDocumentUploadService } from "../Services/application-service/document-upload-application.service";
import { CertificateInfoUploadService } from "../Services/application-service/certficate-info-upload.service";
import { IndividualApplicationService } from "../Services/application-service/individual-application-save.service";
import { ResidentialAddressUploadService } from "../Services/application-service/residential-address.service";
import { ApplicationAPIEndpoint } from "../Services/application-service/api-endpoint.service";
import { ApplicationUploadService } from "../Services/application-service/application-upload.service";
import { GetUserApplicantInfoFromBackendService } from "../Services/application-service/get-user-applicant-info.service";
import { LoginRequestService } from "../Services/login-service/login-request.service";
import { ApiEndpointService } from "../Services/login-service/api-endpoint.service";
import { ProfileAPIEndPointService } from "../Services/profile-service/api-endpoint.service";
import { UserProfileRepositoryService } from "../Services/profile-service/user-profile-repository.service";
import {  NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { CheckPasswordService } from "../Services/profile-service/check-password.service";
import { AuthenticationService } from "../Services/authorzation/authenticate.service";

export const DashboardComponents = [
    DashboardComponent,
    ApplicationsComponent,
    ApplicationTypeComponent,
    ApplicationFormComponent,
    ResidentialAddressComponent,
    OrganizationDetailsComponent,
    VerificationDocumentUploadComponent,
    OtherDocumentsComponent,
    OrganizationalDocumentComponent,
    LoginComponent,
    ProfileComponent
    
]
export const ServiceConst = [
    GetDocumentService,
    OrganizationTypeService,
    OrganizationApplicationService,
    ApplicationDocumentUploadService,
    CertificateInfoUploadService,
    IndividualApplicationService,
    ResidentialAddressUploadService,
    ApplicationAPIEndpoint,
    ApplicationUploadService,
    GetUserApplicantInfoFromBackendService,
    LoginRequestService,
    ApiEndpointService,
    ProfileAPIEndPointService,
    UserProfileRepositoryService,
    CheckPasswordService ,
    AuthenticationService
]
@NgModule({
    declarations: [DashboardComponents],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        NgxSkeletonLoaderModule
    ],
    exports: [DashboardComponents],
    providers: [
        ServiceConst
    ],
})
export class DashboardComponentModule { }

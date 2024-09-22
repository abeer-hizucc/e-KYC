import { APP_INITIALIZER, NgModule } from "@angular/core";

import { UserStatusComponent } from "./user-status/user-status.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { ApplicationStatusRoutingModule } from "./application-status-routing.module";
import { RemarksDialogComponent } from "./user-status/remarks-dialog/remarks-dialog.component";
import { UserApplicationStatusRequestService } from "../Services/application-status-service/user-status/status-request.service";
import { UserStatusApiEndpointService } from "../Services/application-status-service/user-status/api-endpoint.service";
import { AuthenticationService } from "../Services/authorzation/authenticate.service";
import { InitialAuthService } from "../Services/authorzation/initial-auth.service";
import { JwtDecoderService } from "../Services/authorzation/jwt-decoder.service";




@NgModule(
  {
    declarations: [

      UserStatusComponent,
      RemarksDialogComponent,
      
    ],
    imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      ApplicationStatusRoutingModule,
     

    ],
    exports: [

      UserStatusComponent,
      
    ],
    providers: [
      UserApplicationStatusRequestService,
      UserStatusApiEndpointService,
      AuthenticationService,
      InitialAuthService,
      JwtDecoderService,
      
    ]
  }
)
export class ApplicationStatusModule {

}
import { RouterModule, Routes } from "@angular/router";
import { NgModule, inject } from "@angular/core";
import { UserStatusComponent } from "./user-status/user-status.component";
import { AuthenticationService } from "../Services/authorzation/authenticate.service";






const routes: Routes = [
    {
        path: '', component: UserStatusComponent

    }, 
  
   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApplicationStatusRoutingModule { }
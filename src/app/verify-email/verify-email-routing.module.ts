import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OTPComponent } from "./components/otp.component";

const routes:Routes = [
    {
        path:'', component:OTPComponent, 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VerifyEmailRoutingModule { }
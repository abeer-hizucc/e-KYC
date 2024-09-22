import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ApplicationsComponent } from './dashboard/applications/applications.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthenticationService } from './Services/authorzation/authenticate.service';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'register',loadChildren:()=>import('./register/register.module').then(m=>m.RegisterModule)},
  { path: 'login', component: LoginComponent },
  { path: 'profile/user/:userId', component: ProfileComponent ,
    canActivate:[()=>inject(AuthenticationService).isAuthenticated()]
  },
  { path: 'application/:userId', component: ApplicationsComponent,
    canActivate:[()=>inject(AuthenticationService).isAuthenticated()]
   },
  {
    path: 'status/user',
    loadChildren: () => import('./application-status/application-status.module').then(m => m.ApplicationStatusModule),
     canActivate:[()=>inject(AuthenticationService).isAuthenticated()]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

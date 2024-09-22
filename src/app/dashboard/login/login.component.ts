import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authorzation/authenticate.service';
import { LoginRequestService } from 'src/app/Services/login-service/login-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  showErrormessage:boolean=false;
  constructor(
  
    private router:Router,
    private authenticateService:AuthenticationService
){}
  ngOnInit(): void {
    if(this.authenticateService.isAuthenticated()){
      this.router.navigate(['/status/user']);
    }
    else{
      this.authenticateService.login();
    }
  }



}

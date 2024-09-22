import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authorzation/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    // if(this.authenticationService.isAuthenticated()){
    //  this.router.navigate(['status/user'],{relativeTo:this.route});
    // }else{
    //  this.router.navigate(['dashboard'],{relativeTo:this.route});
    
    // }
  
   }
  // constructor(
  //  private authenticationService:AuthenticationService,
  //  private router:Router,
  //  private route:ActivatedRoute
  //  ){}
  title = 'e-KYC';
}

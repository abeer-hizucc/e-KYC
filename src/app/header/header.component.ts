import { CommonModule } from '@angular/common';
import { Component, DoCheck,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {  MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from '../Services/authorzation/authenticate.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,DoCheck {
clickLogo() {
this.router.navigate(['/dashboard']);
}
  routeStatus: string = 'default';
  userName!: string;
  constructor(private dialog: MatDialog,
     private router: Router,
     private oauthService:AuthenticationService
    
    ) {}
  ngDoCheck(): void {
     this.userName = sessionStorage.getItem('userName')!;
  }
  ngOnInit() {
    // Subscribe to router events to update routeStatus
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateRouteStatus();
      }
    });

    // Initial check
    this.updateRouteStatus();
    
  }
  Openpopup() {
    // this.dialog.open(LoginComponent, {
    //   height:'auto', 
    //   width: 'auto',
    //   panelClass: 'custom-snackbar',
    //   hasBackdrop: true
    // });
    this.oauthService.login();
  }
  private updateRouteStatus() {
    const currentRoute = this.router.url;

    // Check if user is logged in or not
    const isUserLoggedIn = sessionStorage.getItem('userId')||sessionStorage.getItem('adminId') !== null;

    if (isUserLoggedIn) {
      this.routeStatus = 'userLoggedIn';
    } else if (currentRoute === '/dashboard') {
      this.routeStatus = 'landing';
    } else {
      this.routeStatus = 'default';
    }
  }
  logout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    this.oauthService.logout();
  }
  goToProfile(){
    const userId = sessionStorage.getItem('userId');
    this.router.navigate([`/profile/user/${userId}`]);
  }
}

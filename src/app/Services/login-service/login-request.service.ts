import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel, LoginResponseModel } from "src/app/models/login-models/login.model";
import { ApiEndpointService } from "./api-endpoint.service";
import { Observable, catchError, first, map, of } from "rxjs";

@Injectable()
export class LoginRequestService{
constructor(
    private http:HttpClient,
    private route:Router,
    private url:ApiEndpointService
){}


uploadLoginInfo(logInfo: LoginModel): Observable<boolean> {
  return this.http.post<LoginResponseModel>(this.url.getLoginUrl(), logInfo).pipe(
    first(),
    map((response: LoginResponseModel) => {
      if (!response.userId || response.role === null || response.role === undefined) {
        return false;
      } else {
        sessionStorage.setItem('userRole', response.role);
        if(response.role==='Admin'){
          sessionStorage.setItem('adminId', response.userId);
          this.route.navigate(['status/admin', response.userId]);
        }
        else if(response.role==='User'){
          sessionStorage.setItem('userId', response.userId);
          this.route.navigate(['status/user', response.userId]);
        }


        return true;
      }
    }),
    catchError((err:HttpErrorResponse) => {
      if (err.status===401) {
        console.log("Unauthorized",err.message);
      }
      else if(err.status===404){
        console.log("Server error",err.message);
      }
      else{
        console.log("Unknown error",err.message);
      }
      return of(false);
    })
  );
}

}
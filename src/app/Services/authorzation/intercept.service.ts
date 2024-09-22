import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";




@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(
        private snackBar:MatSnackBar

    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('access_token');
        
        if(token
            &&
            req.url.toString().indexOf('token') < 0
        ){
            console.log("request is intercepted");
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }else if(!token){
            console.log("token is not available");
            req = req.clone({
                setHeaders:{
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.snackBar.open(error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['mat-snack-bar-error','mat-snackbar-size']
                  });
              throw error.statusText;
              console.log(error);
            })
          );
    }
}
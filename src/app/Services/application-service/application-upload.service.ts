import { Injectable, OnInit } from "@angular/core";
import { IndividualApplicationModel } from "src/app/models/application-models/individual-application.model";
import { HttpClient } from "@angular/common/http";
import {  Router } from "@angular/router";
import { ApplicationUploadResponseModel } from "src/app/models/application-models/application-upload-response.model";
import { ApplicationAPIEndpoint } from "./api-endpoint.service";
import { first} from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrganizationApplicationModel } from "src/app/models/application-models/organization-application.model";

@Injectable()
export class ApplicationUploadService implements OnInit{
    apiIndividualURL = this.applicationAPIEndpoint.getIndividualApplicationUploadUrl();
    apiOrganizationURL = this.applicationAPIEndpoint.getOrganizationApplicationUploadUrl();
    constructor(
        private http: HttpClient,
        private router: Router,
        private applicationAPIEndpoint: ApplicationAPIEndpoint,
        private snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
        
    }

    uploadIndividualApplication(individualApplicationInfo: IndividualApplicationModel){
        let isSuccess = false;
        const userId = sessionStorage.getItem('userId')!;
        if (individualApplicationInfo) {
            this.http.post<ApplicationUploadResponseModel>(this.apiIndividualURL+userId, individualApplicationInfo).subscribe(
                {
                    next: (response: ApplicationUploadResponseModel) => {                        
                        isSuccess = true;
                        console.warn(userId);
                        this.router.navigate(['status/user', userId]);

                    },
                    error: (error) => {
                        console.log("Error Uploading Individual Application Info", error);
                        this.snackBar.open('Application Server is Down. Try Again Later', 'Close', {
                            duration: 3000,
                            
                            panelClass:['mat-snack-bar-error', 'mat-snackbar-size']

                          });
                    },
                    complete: () => {
                        if(isSuccess){
                            this.snackBar.open(`Application Uploaded Successfully`, 'Close', {
                                duration: 3000,
                                panelClass: ['mat-snack-bar-success','mat-snackbar-size'],
                            });
                            this.router.navigate(['status/user', userId]);
                        }
                        else{
                            this.snackBar.open(`Error while Uploading Application`, 'Close', {
                                duration: 3000,
                                panelClass:['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                        }
                    }
                }
            )
        }
    }
    uploadOrganizationApplication(organizationApplicationInfo: OrganizationApplicationModel) {
        let isSuccess = false;
        const userId = sessionStorage.getItem('userId')!;
        if (organizationApplicationInfo) {
            this.http.post<ApplicationUploadResponseModel>(this.apiOrganizationURL+userId, organizationApplicationInfo).pipe(first()).subscribe(
                {
                    next: (response: ApplicationUploadResponseModel) => {
                
                        isSuccess = true;
                        
                        this.router.navigate(['status/user', userId]);

                    },
                    error: (error) => {
                        console.log("Error Uploading Individual Application Info", error);
                        this.snackBar.open('Application Server is Down. Try Again Later', 'Close', {
                            duration: 3000,
                            panelClass:['mat-snack-bar-error', 'mat-snackbar-size']
                          });
                    },
                    complete: () => {
                        if(isSuccess){
                            this.snackBar.open(`Application Uploaded Successfully`, 'Close', {
                                duration: 3000,
                                panelClass: ['mat-snack-bar-success','mat-snackbar-size'],
                            });
                            this.router.navigate(['status/user', userId]);
                        }
                        else{
                            this.snackBar.open(`Error while Uploading Application`, 'Close', {
                                duration: 3000,
                                panelClass:['mat-snack-bar-error', 'mat-snackbar-size']
                            });
                        }
                    }
                }
            );
                
    }

}
}
import { Injectable } from "@angular/core";
import { NidCallService } from "./nid-call.service";
import { NidServerResponseService } from "./nid-server-response.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of } from "rxjs";
import { ConfirmInfoPorichoyModel } from "src/app/models/registration-models/confirm-info.model";
import { DocumentUploadService } from "./document-upload.service";

@Injectable()
export class ConfirmInfoService{
    constructor(
        private nidCallService:NidCallService,
        private nidServerResponseService:NidServerResponseService,
        private snackBar:MatSnackBar,
        private documentUploadService:DocumentUploadService
    ){

    }
    public takeNIDInfoAndGetResponse(data: ConfirmInfoPorichoyModel): Observable<boolean> {
        if (data) {
          return new Observable<boolean>((observer) => {
            this.nidCallService.postNIDConfirmationInfo(data).subscribe(
              (response) => {

                if (response.dob != "0001-01-01"&& response.percentage>=80) {
                  this.nidServerResponseService.setResponseData(response);
                  //upload individual photo if successfull
                  this.documentUploadService.uploadIndividualPhoto(data.photo);
                  this.snackBar.open('Nid Information Checked Successfully', 'Close', {
                    duration: 3000,
                    panelClass: ['mat-snack-bar-success','mat-snackbar-size']
                  });
                  observer.next(true); 
                } else if(response.percentage<80) {
                  this.snackBar.open('Submitted Photo Does not match with NID Photo', 'Close', {
                    duration: 3000,
                    panelClass: ['mat-snack-bar-error','mat-snackbar-size']
                  });
                  observer.next(false); 
                }
                else{
                  this.snackBar.open('Wrong Nid Information Inserted', 'Close', {
                    duration: 3000,
                    panelClass: ['mat-snack-bar-error','mat-snackbar-size']
                  });
                  observer.next(false); 
                }
                observer.complete(); 
              },
              (error) => {
                if(error.message.includes("User Already Exists")){
                  this.snackBar.open('User Already Exists', 'Close', {
                    duration: 3000,
                    panelClass: ['mat-snack-bar-error','mat-snackbar-size']
                  });
                }
                console.log("NID Service Error", error);
                this.snackBar.open('Something Wrong With NID Server', 'Close', {
                  duration: 3000,
                  panelClass: ['mat-snack-bar-error','mat-snackbar-size']
                });
                observer.next(false); 
                observer.complete(); 
              }
            );
          });
        }
      
        return of(false); // Return false when data is not available
      }
      
    }
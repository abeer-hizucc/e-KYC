import { Injectable } from '@angular/core';
import{HttpClient, HttpEventType} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NIDAndDOBService } from './nid-front-cover-response.service';
import { ConfirmInfoModel } from 'src/app/models/registration-models/confirm-info.model';
import { RegistrationAPIEndpoint } from './api-endpoint.service';
@Injectable()
export class FrontCoverPhotoUploadService {
 uploadSub!: Subscription | null;
 apiUrl = this.getApiUrl.getNIDInfoUploadUrl(); 

  constructor(
    private http: HttpClient,
    private router:Router,
    private snackBar: MatSnackBar,
    private nidANDDOBService: NIDAndDOBService,
    private getApiUrl: RegistrationAPIEndpoint
     ) {}
    onFrontCoverPhotoUploadFinished(file: File|null) {
        if (file) {
      
          const formData = new FormData();
          formData.append("file", file);
      
          const upload$ = this.http.post(this.apiUrl, formData, {
          reportProgress: true,
            observe: 'events'
          }).pipe(
            finalize(() => this.reset())
          );
      
          this.uploadSub = upload$.subscribe(
            (event) => {
               if (event.type === HttpEventType.Response) {
                //taking the response of ocr from the server
                
                const confirmationInfo:ConfirmInfoModel = event.body as ConfirmInfoModel;
                this.nidANDDOBService.setResponseData(confirmationInfo);
                console.log("Response data:",confirmationInfo);
                
                //snackbar
                
                this.snackBar.open('OCR done successfully', 'Close', {
                  duration: 3000,
                  panelClass: ['mat-snack-bar-success','mat-snackbar-size']
                
                });
              }
              else if(event.type === HttpEventType.UploadProgress){
                
              }
            },
            (error) => {
              // Error occurred during upload, show an error snackbar
              this.snackBar.open('Error doing OCR', 'Close', {
                duration: 3000,
                panelClass: ['mat-snack-bar-error','mat-snackbar-size']
               
              });
            }
          );
        } else {
          this.reset(); 
        }
        
      }
      
      reset() {
      this.uploadSub = null;
      }
      
     
    }
import { Injectable } from '@angular/core';
import { ApplicationAPIEndpoint } from './api-endpoint.service';
import { HttpClient } from '@angular/common/http';
import { DocumentResponseModel } from 'src/app/models/registration-models/document-response.model';
import { OrganizationApplicationService } from './organization-application.service';
import { IndividualApplicationService } from './individual-application-save.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
/*
for individual application:
Mandatory Documents: document1Id, document2Id
Optional Documents: document7Id, document8Id
for Public Limited Company:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id, document6Id
Optional Documents: document7Id, document8Id
for Private Limited Company:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id,document6Id
Optional Documents: document7Id, document8Id
for Partnership Firm:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id
Optional Documents: document7Id, document8Id
for Proprietary Firm:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id,document6Id
Optional Documents: document7Id, document8Id
for Government:
Mandatory Documents: document1Id, document2Id, document3Id
Optional Documents: document7Id, document8Id
for Bank:
Mandatory Documents: document1Id, document2Id, document3Id
Optional Documents: document7Id, document8Id

*/
@Injectable()
export class ApplicationDocumentUploadService {
  apiURL = this.applicationAPIEndpoint.getDocumentUploadUrl();
  responeId!: string;
  constructor(
    private applicationAPIEndpoint: ApplicationAPIEndpoint,
    private http: HttpClient,
    private individualApplicationService: IndividualApplicationService,
    private organizationApplicationService: OrganizationApplicationService,
    private snackBar: MatSnackBar
  ) { }
  applicationDocumentUpload(
    file: File,
    applicationType: string,
    documentType: string
  ) {
    const formData = new FormData();
    formData.append('file', file);

    let setMethod: (documentId: string) => void;

    if (applicationType === 'individual') {
      if (documentType.includes('document1Id')) {
        setMethod = this.individualApplicationService.setDocument1Id;
      } else if (documentType.includes('document2Id')) {
        setMethod = this.individualApplicationService.setDocument2Id;
      }
      else if (documentType.includes('document7Id')) {
        setMethod = this.individualApplicationService.setDocument7Id;
      } else if(documentType.includes('document8Id')){
        setMethod = this.individualApplicationService.setDocument8Id;
      }
    } else if (applicationType === 'organization') {
      if (documentType.includes('document1Id')) {
        setMethod = this.organizationApplicationService.setDocument1Id;
      } else if (documentType.includes('document2Id')) {
        setMethod = this.organizationApplicationService.setDocument2Id;
      }
      else if (documentType.includes('document3Id')) {
        setMethod = this.organizationApplicationService.setDocument3Id;
      }else if (documentType.includes('document4Id')) {
        setMethod = this.organizationApplicationService.setDocument4Id;
      }else if (documentType.includes('document5Id')) {
        setMethod = this.organizationApplicationService.setDocument5Id;
      }else if (documentType.includes('document6Id')) {
        setMethod = this.organizationApplicationService.setDocument6Id;
      }else if (documentType.includes('document7Id')) {
        setMethod = this.organizationApplicationService.setDocument7Id;
      }else if (documentType.includes('document8Id')) {
        setMethod = this.organizationApplicationService.setDocument8Id;
      }
      
  }

    let isSuccess = false;

    this.http.post<DocumentResponseModel>(this.apiURL, formData).pipe(first()).subscribe(
      {
        next: (response) => {

          //console.log(response.documentId);
          // console.log(this.individualApplicationService);
          // console.log(this.organizationApplicationService);
          this.responeId = response.documentId;
          if(applicationType === 'individual'){
            setMethod.call(this.individualApplicationService, this.responeId);
          }
          else{
            setMethod.call(this.organizationApplicationService, this.responeId);
          }
          
          isSuccess = true;

        },
        error: (err) => {
          this.snackBar.open('File Server is Down. Try Again Later', 'Close', {
            duration: 5000,
           panelClass:['mat-snack-bar-error', 'mat-snackbar-size']
          });
        },
        complete: () => {
          if (isSuccess) {
            this.snackBar.open(`Successfully uploaded the Document`, 'Close', {
              duration: 5000,
              panelClass:['mat-snack-bar-success', 'mat-snackbar-size']
            });
          } else {
            this.snackBar.open(`Error while uploading Document`, 'Close', {
              duration: 5000,
              panelClass:['mat-snack-bar-error', 'mat-snackbar-size']
            });
          }
        }
      }
    );
  }

}

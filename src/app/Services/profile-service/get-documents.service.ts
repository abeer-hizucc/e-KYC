import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProfileAPIEndPointService } from "./api-endpoint.service";
import { UserInfoModel, UserProfileModel } from "src/app/models/registration-models/user-info.model";
import { Observable, switchMap, forkJoin, map } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserProfileRepositoryService } from "./user-profile-repository.service";
import { UserCreationResponseModel } from "src/app/models/registration-models/user-creation-response.model";
import { DocumentResponseModel } from "src/app/models/registration-models/document-response.model";

@Injectable()
export class GetDocumentService{
    documentApiURL = this.api.getUserDocumentURL();
    userProfileAPiURL =this.api.getUserProfileURL(); 
    constructor(
        private http:HttpClient,
        private api:ProfileAPIEndPointService,
        private snackBar: MatSnackBar,
        private userProfileRepositoryService:UserProfileRepositoryService
    ){}
    getUserInfo(): Observable<UserProfileModel> {
      const baseUrl = this.userProfileAPiURL;
      const url = baseUrl + '/' + sessionStorage.getItem('userId');
  
      return this.http.get<UserInfoModel>(url).pipe(
        switchMap((userResponse) => {
          const documentIds = [
            userResponse.userPhotoDocumentId,
            userResponse.nidFrontDocumentId,
            userResponse.nidBackDocumentId
          ];
          this.userProfileRepositoryService.setUserName(userResponse.userName as string);
          this.userProfileRepositoryService.setGivenName(userResponse.givenName as string);
          this.userProfileRepositoryService.setSurName(userResponse.surName as string);
          this.userProfileRepositoryService.setFathersName(userResponse.fathersName as string);
          this.userProfileRepositoryService.setMothersName(userResponse.mothersName as string);
          this.userProfileRepositoryService.setDateOfBirth(userResponse.dateOfBirth as string);
          this.userProfileRepositoryService.setPhoneNumber(userResponse.phoneNumber as string);
          this.userProfileRepositoryService.setNidNumber(userResponse.nidNumber as string);
          this.userProfileRepositoryService.setUserPhotoDocumentId(userResponse.userPhotoDocumentId as string);
          this.userProfileRepositoryService.setNidFrontDocumentId(userResponse.nidFrontDocumentId as string);
          this.userProfileRepositoryService.setNidBackDocumentId(userResponse.nidBackDocumentId as string);
          this.userProfileRepositoryService.setGender(userResponse.gender as string);
          this.userProfileRepositoryService.setnationality(userResponse.nationality as string);
          this.userProfileRepositoryService.setEmail(userResponse.email as string);
          this.userProfileRepositoryService.setPassword(userResponse.password as string);

          const documentRequests = documentIds.map((documentId) =>
            this.getDocumentById(documentId as string)
          );
  
          return forkJoin(documentRequests).pipe(
            map((documents) => {
              const userApplicationForm: UserProfileModel = {
                email: userResponse.email,
                userName: userResponse.userName,
                phoneNumber: userResponse.phoneNumber,
                password: userResponse.password,
                surName: userResponse.surName,
                givenName: userResponse.givenName,
                fathersName: userResponse.fathersName,
                mothersName: userResponse.mothersName,
                gender: userResponse.gender,
                nationality: userResponse.nationality,
                nidNumber: userResponse.nidNumber,
                dateOfBirth: userResponse.dateOfBirth,
                userPhotoDocument: documents[0],
                nidFrontDocument: documents[1],
                nidBackDocument: documents[2],
                
              };
  
              return userApplicationForm;
            })
          );
        })
      );
    }

    getDocumentById(documentId: string): Observable<File> {
      const documentUrl = this.documentApiURL + '/' + documentId;
      return this.http.get(documentUrl, { observe: 'response', responseType: 'blob' }).pipe(
        map((response) => {
          const contentDisposition = response.headers.get('Content-Disposition');
         // console.log(contentDisposition);
          let fileName = documentId;
          let type = 'application/octet-stream';
          if (contentDisposition) {
            const fileNameWithQuotes = contentDisposition.split(';')[1].split('=')[1];
            fileName = fileNameWithQuotes.replace(/"/g, ''); 
            const fileExtension = fileName.split('.').pop(); 
          //  console.log(fileExtension);
            switch (fileExtension) {
              case 'jpg':
                type = 'image/jpeg';
                break;
              case 'png':
                type = 'image/png';
                break;
              case 'pdf':
                type = 'application/pdf';
                break;
        
            }
          }
         
         // console.log(type);
          return new File([response.body!], fileName, { type: type });
        })
      );
    }
    
    uploadDocument(document: File, documentId:string) {
      const url = this.documentApiURL+'/'+documentId;
      const formData = new FormData();
      formData.append('file', document);
      this.http.put<DocumentResponseModel>(url, formData).subscribe({
        next: data => {
          if(data.documentId==documentId){
            this.snackBar.open('Updated Succesfully', 'Close', {
              duration: 3000,
              panelClass: ['mat-snack-bar-success','mat-snackbar-size']
            
            });
          }
        },
        error: error => {
          console.log(error)  
          this.snackBar.open('Upload Failed, Please Try Later', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-error','mat-snackbar-size']
          
          });
        }
      })
    }
    updateProfileInfo(userInfo:UserInfoModel){
      const userId = sessionStorage.getItem('userId');
      const url = this.userProfileAPiURL + '/' + userId;
      this.http.put<UserCreationResponseModel>(url,userInfo).subscribe({
        next: data => {
          if(data.userId.toString()==userId){
            this.snackBar.open('Updated Succesfully', 'Close', {
              duration: 3000,
              panelClass: ['mat-snack-bar-success','mat-snackbar-size']
            
            });
          }
        },
        error: error => {
          console.log(error)  
          this.snackBar.open('Update Failed, Please Try Later', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-error','mat-snackbar-size']
          
          });
        }
      })
    }
}
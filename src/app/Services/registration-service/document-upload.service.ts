import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationAPIEndpoint } from "./api-endpoint.service";
import { Observable, Subscription, first, of } from "rxjs";
import { SaveUserInfoService } from "./User-Info-Save.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DocumentResponseModel } from "src/app/models/registration-models/document-response.model";

@Injectable()
export class DocumentUploadService {
    apiUrl = this.getApiUrl.getDocumentUploadUrl();
    uploadSub!: Subscription;
    constructor(
        private http: HttpClient,
        private getApiUrl: RegistrationAPIEndpoint,
        private userInfoService: SaveUserInfoService,
        private snackBar: MatSnackBar
    ) { }


    uploadBackCoverPhoto(file: File | null): Observable<any> {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            this.http.post<DocumentResponseModel>(this.apiUrl, formData).pipe(first()).subscribe(
                (response) => {
                    const backCoverPhotoId = response.documentId;
                    this.userInfoService.saveBackCoverPhotoId(backCoverPhotoId);
                   // console.log("Back Cover Photo Id", backCoverPhotoId);

                }, (error) => {
                    this.snackBar.open('Error uploading Back Cover Photo', 'Close', {
                        duration: 3000,
                        panelClass: ['mat-snack-bar-error','mat-snackbar-size']

                    });
                }
            );
        }
        return of(true);
    }
    uploadIndividualPhoto(file: File) {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            this.http.post<DocumentResponseModel>(this.apiUrl, formData).pipe(first()).subscribe(
                (response) => {
                    const individualPhotoId = response.documentId;
                    this.userInfoService.setIndividualPhotoId(individualPhotoId);
                    console.log("Individual Photo Id", individualPhotoId);
                    this.snackBar.open('Individual photo uploaded successfully', 'Close', {
                        duration: 3000,
                        panelClass: ['mat-snack-bar-success','mat-snackbar-size']
                    });

                }, (error) => {
                    this.snackBar.open('Error uploading Individual photo', 'Close', {
                        duration: 3000,
                        panelClass: ['mat-snack-bar-error','mat-snackbar-size']

                    });
                }
            );
        }

    }
    uploadFrontCoverPhoto(file: File | null) {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            this.http.post<DocumentResponseModel>(this.apiUrl, formData).pipe(first()).subscribe(
                (response) => {
                    const frontCoverPhotoId = response.documentId;
                    this.userInfoService.saveFrontCoverPhotoId(frontCoverPhotoId);
                    this.snackBar.open('Front cover photo uploaded successfully', 'Close', {
                        duration: 3000,
                        panelClass: ['mat-snack-bar-success','mat-snackbar-size']
                    });


                }, (error) => {
                    this.snackBar.open('Error uploading Front cover photo', 'Close', {
                        duration: 3000,
                        panelClass: ['mat-snack-bar-error','mat-snackbar-size']

                    });
                }
            );

        }
    }
}
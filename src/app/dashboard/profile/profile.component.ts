import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { CheckPasswordService } from 'src/app/Services/profile-service/check-password.service';
import { GetDocumentService } from 'src/app/Services/profile-service/get-documents.service';
import { UserProfileRepositoryService } from 'src/app/Services/profile-service/user-profile-repository.service';

import {
  UserInfoModel,
  UserProfileModel,
} from 'src/app/models/registration-models/user-info.model';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterContentChecked {
  userInfo!: UserProfileModel;
  userprofileForm!: FormGroup;
  isEditing: boolean = false;
  @Input() requiredFileType! : string;
  fileSelectedBefore:boolean = false;
  fileNameUserPhoto!: string | undefined;
  fileNameNIDFront!: string | undefined;
  fileNameNIDBack!: string | undefined;
  fileUserPhoto!: File | null;
  fileNIDFront!: File | null;
  fileNIDBack!: File | null;
  isUserPhotoSelected: boolean = true;
  isNIDFrontSelected: boolean = true;
  isNIDBackSelected: boolean = true;
  loader :boolean= true;
  changePassword: boolean = false;
  isPasswordChecking = false;
  isPasswordValid$!:Observable<boolean>;

  @ViewChild('fileUpload') fileUpload!: ElementRef;


  goToApplicationForm() {
    this.activeRoute.paramMap.subscribe((params) => {
     const  userId = params.get('userId')!;
      if (userId) {
        this.router.navigate(['/application',userId]);
      }
    });
  }

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private getDocumentService: GetDocumentService,
    private formBuilder: FormBuilder,
    private userProfileRepositoryService: UserProfileRepositoryService,
    private ref: ChangeDetectorRef,
    private snackBar:MatSnackBar,
    private checkPasswordService:CheckPasswordService
  ) { }
  
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.getDocumentService.getUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;
      setTimeout(() => {this.loader = false;},2000);
      
      this.userprofileForm = this.formBuilder.group({
        userName: [{ value: this.userInfo.userName, disabled: true }],
        email: [
          { value: this.userInfo.email, disabled: !this.isEditing },
          Validators.email,
        ],
        givenName: [
          { value: this.userInfo.givenName, disabled: !this.isEditing },
          Validators.required,
        ],
        surName: [
          { value: this.userInfo.surName, disabled: !this.isEditing },
          Validators.required,
        ],
        fathersName: [
          { value: this.userInfo.fathersName, disabled: !this.isEditing },
          Validators.required,
        ],
        mothersName: [
          { value: this.userInfo.mothersName, disabled: !this.isEditing },
          Validators.required,
        ],
        dateOfBirth: [{ value: this.userInfo.dateOfBirth, disabled: true }],
        mobileNumber: [
          { value: this.userInfo.phoneNumber, disabled: !this.isEditing },
          Validators.required,
        ],
        nidNumber: [{ value: this.userInfo.nidNumber, disabled: true }],
        gender: [
          { value: this.userInfo.gender, disabled: !this.isEditing },
          Validators.required,
        ],
        nationality: [
          { value: this.userInfo.nationality, disabled: !this.isEditing },
          Validators.required,
        ],
        currentPassword: [
          { value: '', disabled: !this.isEditing },
        ],
        changePassword:[
          { value: 'no', disabled: !this.isEditing },
        ],
        newPassword: [
          { value: '', disabled: !this.isEditing },
          [PasswordValidator.correctPassword()]
         ],
        confirmPassword: [
          { value: '', disabled: !this.isEditing },
        ],
      });
    });
  }
  getUserPhotoURL(): string | null {
    if (this.userInfo.userPhotoDocument) {
      return URL.createObjectURL(this.userInfo.userPhotoDocument);
    }
    return null;
  }
  getNIDFrontURL(): string | null {
    if (this.userInfo.nidFrontDocument) {
      return URL.createObjectURL(this.userInfo.nidFrontDocument);
    }
    return null;
  }

  getNIDBackURL(): string | null {
    if (this.userInfo.nidBackDocument) {
      return URL.createObjectURL(this.userInfo.nidBackDocument);
    }
    return null;
  }
  toggleFormEditing() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.userprofileForm.get('givenName')?.enable();
      this.userprofileForm.get('surName')?.enable();
      this.userprofileForm.get('fathersName')?.enable();
      this.userprofileForm.get('mothersName')?.enable();
      this.userprofileForm.get('mobileNumber')?.enable();
      this.userprofileForm.get('gender')?.enable();
      this.userprofileForm.get('nationality')?.enable();
      this.userprofileForm.get('email')?.enable();
      this.userprofileForm.get('password')?.enable();
      this.userprofileForm.get('changePassword')?.enable();
      this.userprofileForm.get('currentPassword')?.enable();
      this.userprofileForm.get('newPassword')?.enable();
      this.userprofileForm.get('confirmPassword')?.enable();
    } else {
      this.userprofileForm.disable();
    }
  }
  updateUserProfile() {
    if (
      this.userprofileForm.get('givenName')?.value === '' ||
      this.userprofileForm.get('surName')?.value === '' ||
      this.userprofileForm.get('fathersName')?.value === '' ||
      this.userprofileForm.get('mothersName')?.value === '' ||
      this.userprofileForm.get('mobileNumber')?.value === '' ||
      this.userprofileForm.get('gender')?.value === '' ||
      this.userprofileForm.get('nationality')?.value === '' ||
      this.userprofileForm.get('email')?.value === '' ||
      this.userprofileForm.get('password')?.value === ''
    ) {
      this.snackBar.open('Please fill all the required fields', 'Close', {
        duration:3000,
        panelClass: ['mat-snack-bar-error','mat-snackbar-size'],
      })
      
    }else if(this.userprofileForm.get('newPassword')?.value !== this.userprofileForm.get('confirmPassword')?.value){
      
      this.snackBar.open('Password Did not Match', 'Close', {
        duration:3000,
        panelClass: ['mat-snack-bar-error','mat-snackbar-size'],
      })
    } 
    else {
      this.userProfileRepositoryService.setGivenName(
        this.userprofileForm.get('givenName')?.value
      );
      this.userProfileRepositoryService.setSurName(
        this.userprofileForm.get('surName')?.value
      );
      this.userProfileRepositoryService.setFathersName(
        this.userprofileForm.get('fathersName')?.value
      );
      this.userProfileRepositoryService.setMothersName(
        this.userprofileForm.get('mothersName')?.value
      );
      this.userProfileRepositoryService.setPhoneNumber(
        this.userprofileForm.get('mobileNumber')?.value
      );
      this.userProfileRepositoryService.setEmail(
        this.userprofileForm.get('email')?.value
      );
      this.userProfileRepositoryService.setPassword(
        this.userprofileForm.get('newPassword')?.value
      );
      this.userProfileRepositoryService.setnationality(
        this.userprofileForm.get('nationality')?.value
      );
      this.userProfileRepositoryService.setGender(
        this.userprofileForm.get('gender')?.value
      );
      const userInfo: UserInfoModel = {
        userName: this.userProfileRepositoryService.getUserName(),
        givenName: this.userProfileRepositoryService.getGivenName(),
        surName: this.userProfileRepositoryService.getSurName(),
        fathersName: this.userProfileRepositoryService.getFathersName(),
        mothersName: this.userProfileRepositoryService.getMothersName(),
        dateOfBirth: this.userProfileRepositoryService.getDateOfBirth(),
        phoneNumber: this.userProfileRepositoryService.getPhoneNumber(),
        password: this.userProfileRepositoryService.getPassword(),
        email: this.userProfileRepositoryService.getEmail(),
        gender: this.userProfileRepositoryService.getGender(),
        nationality: this.userProfileRepositoryService.getNationality(),
        nidNumber: this.userProfileRepositoryService.getNidNumber(),
        userPhotoDocumentId:
          this.userProfileRepositoryService.getUserPhotoDocumentId(),
        nidFrontDocumentId:
          this.userProfileRepositoryService.getNidFrontDocumentId(),
        nidBackDocumentId:
          this.userProfileRepositoryService.getNidBackDocumentId(),
      };
      this.getDocumentService.updateProfileInfo(userInfo);
    }
  }
  resetUserProfile() {
    this.userprofileForm
      .get('givenName')
      ?.setValue(this.userProfileRepositoryService.getGivenName());
    this.userprofileForm
      .get('email')
      ?.setValue(this.userProfileRepositoryService.getEmail());
    this.userprofileForm
      .get('surName')
      ?.setValue(this.userProfileRepositoryService.getSurName());
    this.userprofileForm
      .get('fathersName')
      ?.setValue(this.userProfileRepositoryService.getFathersName());
    this.userprofileForm
      .get('mothersName')
      ?.setValue(this.userProfileRepositoryService.getMothersName());
    this.userprofileForm
      .get('mobileNumber')
      ?.setValue(this.userProfileRepositoryService.getPhoneNumber());
    this.userprofileForm
      .get('gender')
      ?.setValue(this.userProfileRepositoryService.getGender());
    this.userprofileForm
      .get('nationality')
      ?.setValue(this.userProfileRepositoryService.getNationality());
    this.userprofileForm
      .get('email')
      ?.setValue(this.userProfileRepositoryService.getEmail());
    this.userprofileForm
      .get('password')
      ?.setValue(this.userProfileRepositoryService.getPassword());
  }
  viewNID(blob: File) {
    const reader = new FileReader();
    reader.onload = function () {
      const newWindow = window.open();
      if (blob.type.startsWith('image/')) {
        const img = newWindow!.document.createElement('img');
        img.src = reader.result as string;
        newWindow!.document.body.appendChild(img);
      } else if (blob.type === 'application/pdf') {
        const pdf = newWindow!.document.createElement('iframe');
        pdf.src = reader.result as string;
        pdf.style.width = '100%';
        pdf.style.height = '100%';
        newWindow!.document.body.appendChild(pdf);
      }
    };
    reader.readAsDataURL(blob);
   }
   

  downloadNID(blob: File, filename: string) {
    try {
      if (blob.type.includes('image/jpeg')) {
        filename += '.jpg';
      } else if (blob.type.includes('image/png')) {
        filename += '.png';
      } else if (blob.type.includes('application/pdf')) {
        filename += '.pdf';
      }
      saveAs(blob, filename);
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  }
  //file upload part
  onUserPhotoSelected(event: any) {
    if(!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameUserPhoto){
      this.fileUserPhoto = event.target.files[0];
      this.submitUserPhoto();
      this.fileNameUserPhoto = this.fileUserPhoto?.name;
      this.isUserPhotoSelected = false;
    }
    this.fileSelectedBefore = true;
  }
  onEditButtonClick() {
    this.fileUpload.nativeElement.click();
    setTimeout(() => {
      this.submitUserPhoto();
    }, 0);
 }

  submitUserPhoto(){
    if(this.fileUserPhoto){
     const userPhotoId = this.userProfileRepositoryService.getUserPhotoDocumentId();
     this.getDocumentService.
     uploadDocument(this.fileUserPhoto, userPhotoId);
    }
  }
  cancelUserPhoto(){
      this.fileNameUserPhoto = '';
      this.fileUserPhoto = null;
      this.isUserPhotoSelected = true;
      this.fileSelectedBefore = false;
      const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
      fileInputElement.value = '';
    }
  onNIDFrontSelected(event: any) {
      if(!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameNIDFront){
        this.fileNIDFront = event.target.files[0];
        this.fileNameNIDFront = this.fileNIDFront?.name;
        this.isNIDFrontSelected = false;
      }
      this.fileSelectedBefore = true;
    }
  submitNIDFront(){
      if(this.fileNIDFront){
        const nidFrontId = this.userProfileRepositoryService.getNidFrontDocumentId();
       this.getDocumentService.
       uploadDocument(this.fileNIDFront,nidFrontId);
      }
    }
  cancelNIDFront(){
        this.fileNameNIDFront = '';
        this.fileNIDFront = null;
        this.isNIDFrontSelected = true;
        this.fileSelectedBefore = false;
        const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
        fileInputElement.value = '';
      }
  onNIDBackSelected(event: any) {
        if(!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameNIDBack){
          this.fileNIDBack = event.target.files[0];
          this.fileNameNIDBack = this.fileNIDBack?.name;
          this.isNIDBackSelected = false;
        }
        this.fileSelectedBefore = true;
      }
  submitNIDBack(){
    
    if(this.fileNIDBack){
      const nidBackId = this.userProfileRepositoryService.getNidBackDocumentId();
       this.getDocumentService.
       uploadDocument(this.fileNIDBack, nidBackId);
        }
      }
  cancelNIDBack(){
        this.fileNameNIDBack = '';
        this.fileNIDBack = null;
        this.isNIDBackSelected = true;
        this.fileSelectedBefore = false;
        const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
        fileInputElement.value = '';
  }

checkValidPassword() {
  this.isPasswordChecking = true; // Start the loading state
  const userId = sessionStorage.getItem('userId')!;
  this.isPasswordValid$ = this.checkPasswordService.isValidPassword(
    this.userprofileForm.get('currentPassword')?.value,
    +userId
  );
  this.isPasswordValid$.subscribe({
    next: (response) => {
      this.isPasswordChecking = false; 
      
    },
    error: (error) => {
      this.isPasswordChecking = false; 
      
    }
  });
}


}



  


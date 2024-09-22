
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveUserInfoService } from 'src/app/Services/registration-service/User-Info-Save.service';
import { UserCreationService } from 'src/app/Services/registration-service/User-creation.service';
import { UserInfoModel } from 'src/app/models/registration-models/user-info.model';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  passwordForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private saveUserInfoService: SaveUserInfoService,
    private snackBar: MatSnackBar,
    private createUser: UserCreationService
  ) {}
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['',[ Validators.required,PasswordValidator.correctPassword()]],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.passwordForm?.valid) {
      const passVal = this.passwordForm?.get('password')?.value;
      const conFirmPassVal = this.passwordForm?.get('confirmPassword')?.value;
      if (passVal === conFirmPassVal) {
        console.log('Password Matched');
        this.saveUserInfoService.savePasswordInfo(this.passwordForm.value);
        const userInfo: UserInfoModel = {
          userName: this.saveUserInfoService.getRegistrationForm()
            ?.userName as string,
          givenName: this.saveUserInfoService.getRegistrationForm()
            ?.givenName as string,
          surName: this.saveUserInfoService.getRegistrationForm()
            ?.surName as string,
          password:this.saveUserInfoService.getPasswordInfo()
          ?.password as string,
          fathersName: this.saveUserInfoService.getRegistrationForm()
            ?.fathersName as string,
          mothersName: this.saveUserInfoService.getRegistrationForm()
            ?.mothersName as string,
          email: this.saveUserInfoService.getRegistrationForm()
            ?.email as string,
          phoneNumber: this.saveUserInfoService.getRegistrationForm()
            ?.phoneNumber as string,
          dateOfBirth: this.saveUserInfoService.getDob() as string,
          nidNumber: this.saveUserInfoService.getNid() as string,
          gender: this.saveUserInfoService.getRegistrationForm()
            ?.gender as string,
          nationality: this.saveUserInfoService.getRegistrationForm()
            ?.nationality as string,
          userPhotoDocumentId:
            this.saveUserInfoService.getIndividualPhotoId() as string,
          nidFrontDocumentId:
            this.saveUserInfoService.getFrontCoverPhotoId() as string,
          nidBackDocumentId:
            this.saveUserInfoService.getBackCoverPhotoId() as string,
        };
        this.onFormCompletion.emit(true);
        console.log(userInfo);
        this.createUser.createUserInBackend(userInfo);
      } else {
        //console.log('Password Not Matched');
        this.snackBar.open('Password MisMatched', 'Close', {
          duration: 3000, 
          panelClass: ['mat-snack-bar-success','mat-snackbar-size'],
        });
      }
    }
  }
}

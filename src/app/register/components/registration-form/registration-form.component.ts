import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GivenNsurnameService } from 'src/app/Services/miscellaneous-service/givenNsurname.service';
import { SaveUserInfoService } from 'src/app/Services/registration-service/User-Info-Save.service';
import { NIDResponseModel,NIDResponsePorichoyModel } from 'src/app/models/registration-models/nid-response.model';
import { CustomPhoneNumberValidator } from 'src/app/validators/phoneNumber.validator';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  @Input() responseRegistrationForm!: NIDResponsePorichoyModel | null;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private saveUserInfoService: SaveUserInfoService,
    private snackBar: MatSnackBar,
    private givenNSurnameService:GivenNsurnameService
  ) {

  }
  ngOnInit(): void {
    const [givenName, surName] = this.givenNSurnameService.extractGivenAndSurname(this.responseRegistrationForm?.nameEn as string);
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      givenName: [givenName, Validators.required],
      surName: [surName, Validators.required],
      fathersName: [this.responseRegistrationForm?.fatherEn, Validators.required],
      mothersName: [this.responseRegistrationForm?.motherEn, Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phoneNumber: ['', [Validators.required,CustomPhoneNumberValidator.phoneNumber()]],
      dateOfBirth: [{ value: this.responseRegistrationForm?.dob, disabled: true }, Validators.required], 
      nidNumber: [{ value: this.responseRegistrationForm?.nationalId, disabled: true }, Validators.required], 
      gender: ['', Validators.required],
      nationality: ['Bangladeshi', Validators.required]
    });
  }
  onSubmit() {
    if (this.registrationForm?.valid) {
      console.log(this.registrationForm.value);
      this.saveUserInfoService.saveRegistrationForm(this.registrationForm.value);
      const isCompleted = true;
      this.onFormCompletion.emit(isCompleted);
      this.snackBar.open('Form Filled Successfully', 'Close', {
        duration: 3000, // Display for 3 seconds
        panelClass: ['mat-snack-bar-success','mat-snackbar-size'],
      });
    } else {
      //console.log(this.registrationForm);
      this.snackBar.open('Please Fill The Form Correctly', 'Close', {
        duration: 3000, // Display for 3 seconds
        panelClass: ['mat-snack-bar-error','mat-snackbar-size'],
      });
    }
  }

}
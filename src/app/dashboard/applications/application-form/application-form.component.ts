import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationFormModel } from 'src/app/models/application-models/application-form.model';
import { RegistrationFormModel } from 'src/app/models/registration-models/registration-form.model';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit{
  applicationForm!: FormGroup;
  @Input() applicationFormValue!:ApplicationFormModel;
  constructor(
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
   
    this.applicationForm = this.formBuilder.group({
     eKYCNumber: [{value:this.applicationFormValue.ekycnumber,disabled:true}],
      givenName: [{value:this.applicationFormValue.givenName,disabled:true}],
      surName: [{value:this.applicationFormValue.surName,disabled:true}],
      fathersName: [{value:this.applicationFormValue.fathersName,disabled:true}],
      mothersName: [{value:this.applicationFormValue.mothersName,disabled:true}],
      dateOfBirth: [{value:this.applicationFormValue.dateOfBirth,disabled:true}],
      nidNumber: [{value:this.applicationFormValue.nidNumber,disabled:true}],
      gender: [{value:this.applicationFormValue.gender,disabled:true}],
      nationality: [{value:this.applicationFormValue.nationality,disabled:true}]
    });
  }
  

  
}

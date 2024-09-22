import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CertificateInfoUploadService } from 'src/app/Services/application-service/certficate-info-upload.service';
import { OrganizationTypeService } from 'src/app/Services/application-service/organization-type.service';

@Component({
  selector: 'app-application-type',
  templateUrl: './application-type.component.html',
  styleUrls: ['./application-type.component.scss']
})
export class ApplicationTypeComponent {

  certificateClass:String[]=['Class 2','Class 3'];
  certificateValidity:number[]=[1,2];
  selectedApplicationType: string = 'individual';
  selectedOrganizationType:string = '';
  selectedCertificateClass!: string; 
  selectedCertificateValidity!: number; 
  @Output() applicationTypeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  applicationTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private orgType:OrganizationTypeService,
     private certificateInfoUploadService:CertificateInfoUploadService,
     private snackBar: MatSnackBar
     
     )
      {
    this.applicationTypeForm = this.formBuilder.group({
      applicationType: ['individual', Validators.required],
      organizationType: [''],
      certificateType: ['',Validators.required]
    });
  }

  onApplicationTypeChange() {
    this.selectedApplicationType = this.applicationTypeForm.get('applicationType')?.value;
    this.applicationTypeSelected.emit(this.selectedApplicationType);
  }
  onOrganizationTypeChange() {
    this.selectedOrganizationType = this.applicationTypeForm.get('organizationType')?.value;
    this.orgType.setOrganizationType(this.selectedOrganizationType);
    }
  
  onSubmit(){
  if(this.applicationTypeForm.valid && this.selectedCertificateValidity!=null && this.selectedCertificateClass!=null){
    if(this.selectedApplicationType ==='government'){
      this.selectedApplicationType ='organization';
      this.selectedOrganizationType ='Government';
      this.orgType.setOrganizationType('Government');
    }
    //keeping it in sessionStorage for now. Can be changed to localStorage if needed
    sessionStorage.setItem('applicationType',this.selectedApplicationType);
    if(this.selectedApplicationType ==='organization'){
      sessionStorage.setItem('organizationType',this.selectedOrganizationType);
    }
    const certificateType = this.applicationTypeForm.get('certificateType')?.value;
    console.log(certificateType);
    const value = this.certificateInfoUploadService.
    uploadCertificateInfo(this.selectedCertificateClass,
      this.selectedCertificateValidity,
      this.selectedApplicationType,
      certificateType);
    if(value){
      this.onFormCompletion.emit(true);
    }
  }
  else{
    this.snackBar.open('Please Fill The Form Correctly', 'Close', {
      duration: 3000,
      panelClass: ['mat-snack-bar-error','mat-snackbar-size'],
    });
  }
  }
  }


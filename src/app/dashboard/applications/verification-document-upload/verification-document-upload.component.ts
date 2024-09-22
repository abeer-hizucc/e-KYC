import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationDocumentUploadService } from 'src/app/Services/application-service/document-upload-application.service';
import { IndividualApplicationService } from 'src/app/Services/application-service/individual-application-save.service';
import { OrganizationApplicationService } from 'src/app/Services/application-service/organization-application.service';

@Component({
  selector: 'app-verification-document-upload',
  templateUrl: './verification-document-upload.component.html',
  styleUrls: ['./verification-document-upload.component.scss']
})
export class VerificationDocumentUploadComponent {
  isUtilityDocumentValid!: boolean;
  @Input() requiredFileType!: string;
  fileSelectedBefore: boolean = false;
  fileNamePassport!: string | undefined;
  fileNameTinCertificate!: string | undefined;
  fileNameUtility!: string | undefined;
  filePassport!: File | null;
  fileTinCertificate!: File | null;
  fileUtility!: File | null;
  utilityForm!: FormGroup;
  isPassportSelected: boolean = true;
  isTinCertificateSelected: boolean = true;
  isUtilitySelected: boolean = true;
  applicationType: string | null = null;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private applicationDocumentUploadService: ApplicationDocumentUploadService,
    private organizationApplicationService:OrganizationApplicationService,
    private individualApplicationService:IndividualApplicationService
  ) { 
    this.isUtilityDocumentValid = false;
  }
  ngOnInit(): void {
    this.utilityForm = this.formBuilder.group({
      utilityBillType: ['', Validators.required]
    });
  }

  onPassportSelected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNamePassport) {
      this.filePassport = event.target.files[0];
      this.fileNamePassport = this.filePassport?.name;
      this.isPassportSelected = false;
    }
    this.fileSelectedBefore = true;

  }
  submitPassport() {
    if (this.filePassport) {
      this.applicationType = sessionStorage.getItem('applicationType')!;
      const documentType = "document1Id";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.filePassport, this.applicationType, documentType);
    }
  }
  cancelPassport() {
    this.filePassport = null;
    this.fileNamePassport = '';
    this.isPassportSelected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  onTinCertificateSelected(event: any) {
    this.fileTinCertificate = event.target.files[0];
    this.fileNameTinCertificate = this.fileTinCertificate?.name;
    this.isTinCertificateSelected = false;
  }
  submitTinCertificate() {
    if (this.fileTinCertificate) {
      this.applicationType = sessionStorage.getItem('applicationType')!;
      const documentType = "tinDocumentId";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileTinCertificate, this.applicationType, documentType);
    }
  }

  cancelTinCertificate() {
    this.fileTinCertificate = null;
    this.fileNameTinCertificate = '';
    this.isTinCertificateSelected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';
  }


  onUtilitySelected(event: any) {
    this.fileUtility = event.target.files[0];
    this.fileNameUtility = this.fileUtility?.name;
    this.isUtilitySelected = false;
  }
  submitUtility() {
    if (this.fileUtility) {
      this.applicationType = sessionStorage.getItem('applicationType')!;
      const documentType = "document2Id";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileUtility, this.applicationType, documentType);
      if(this.applicationType === 'individual'){
        this.individualApplicationService.setUtilityBillType(this.utilityForm.controls['utilityBillType'].value);
      }else if(this.applicationType === 'organization'){
        this.organizationApplicationService.setUtilityBillType(this.utilityForm.controls['utilityBillType'].value);
      }
    }
  }

  cancelUtility() {
    this.fileUtility = null;
    this.fileNameUtility = '';
    this.isUtilitySelected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';
  }
 
}

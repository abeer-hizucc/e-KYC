import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationDocumentUploadService } from 'src/app/Services/application-service/document-upload-application.service';
import { OrganizationTypeService } from 'src/app/Services/application-service/organization-type.service';
import { CertificateTypeDetail } from 'src/app/models/application-models/application-form.model';
import { AppConfig } from 'src/app/shared/app.config';

@Component({
  selector: 'app-organizational-document',
  templateUrl: './organizational-document.component.html',
  styleUrls: ['./organizational-document.component.scss']
})
/*
Since there are different types of organizations, the documents required for each organization type are different.
There will be two flags for determining no of mandatory documents for each organization type.
Name of these flags would be  isRequired_3, isRequired_4.
These flags will be used to determine the no of mandatory documents for each organization type.
For organization type "Private Limited Company" there are 4 mandatory documents.
For organization type "Bank" nad "Government" there is 1 mandatory document.
The name of the doc will be set according to organization type.
Check app.config.ts file for the document structure for each entities.
*/ 
export class OrganizationalDocumentComponent {
  @Input() requiredFileType!: string;
  fileSelectedBefore: boolean = false;
  fileNameOrganizationMandatory_1!: string | undefined;
  fileNameOrganizationMandatory_2!: string | undefined;
  fileNameOrganizationMandatory_3!: string | undefined;
  fileNameOrganizationMandatory_4!: string | undefined;

  OrganizationMandatory_1Doc!:string;
  OrganizationMandatory_2Doc!:string;
  OrganizationMandatory_3Doc!:string;
  OrganizationMandatory_4Doc!:string;
  
 
  fileOrganizationMandatory_1!: File | null;
  fileOrganizationMandatory_2!: File | null;
  fileOrganizationMandatory_3!:File | null;
  fileOrganizationMandatory_4!:File | null;
  
  isOrganizationMandatory_1Selected: boolean = true;
  isOrganizationMandatory_2Selected: boolean = true;
  isOrganizationMandatory_3Selected:boolean = true;
  isOrganizationMandatory_4Selected:boolean = true;

  
  isRequired_3:boolean = false;
  isRequired_4:boolean = false;
  applicationType!:string;

  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private orgType:OrganizationTypeService,
    private applicationDocumentUploadService:ApplicationDocumentUploadService
  
  ) { }
  ngOnInit(): void {
    this.orgType.organizationType$.subscribe((organizationType) => {
      if(organizationType ==='') organizationType = 'Government';
      console.log(organizationType);
      const orgTypeDetails = AppConfig.CertificateTypeDetails.find((detail) => 
      detail.applicationType ==='organization' && detail.organizationType.includes(organizationType)
      ) as CertificateTypeDetail;

      console.log(orgTypeDetails.mandatoryDocuments);

      if(orgTypeDetails.mandatoryDocuments.length===4){
        this.OrganizationMandatory_1Doc = orgTypeDetails.mandatoryDocuments[2];
        this.OrganizationMandatory_2Doc = orgTypeDetails.mandatoryDocuments[3];
        console.log(this.OrganizationMandatory_1Doc);
        console.log(this.OrganizationMandatory_2Doc);
        this.isRequired_3 =false;
        this.isRequired_4 = false;
      }
      else if(orgTypeDetails.mandatoryDocuments.length===5){
        this.OrganizationMandatory_1Doc = orgTypeDetails.mandatoryDocuments[2];
        this.OrganizationMandatory_2Doc = orgTypeDetails.mandatoryDocuments[3];
        this.OrganizationMandatory_3Doc = orgTypeDetails.mandatoryDocuments[4];
        console.log(this.OrganizationMandatory_1Doc);
        console.log(this.OrganizationMandatory_2Doc);
        this.isRequired_3 = true;
        this.isRequired_4=false;
      }
      else {
        this.OrganizationMandatory_1Doc = orgTypeDetails.mandatoryDocuments[2];
        this.OrganizationMandatory_2Doc = orgTypeDetails.mandatoryDocuments[3];
        this.OrganizationMandatory_3Doc = orgTypeDetails.mandatoryDocuments[4];
        this.OrganizationMandatory_4Doc = orgTypeDetails.mandatoryDocuments[5];
        this.isRequired_4 =true;
        this.isRequired_3=false;
      }
    });
    
  }

  onOrganizationMandatory_1Selected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameOrganizationMandatory_1) {
      this.fileOrganizationMandatory_1 = event.target.files[0];
      this.fileNameOrganizationMandatory_1 = this.fileOrganizationMandatory_1?.name;
      this.isOrganizationMandatory_1Selected = false;
    }
    this.fileSelectedBefore = true;
    
  }
  submitOrganizationMandatory_1() {
    if (this.fileOrganizationMandatory_1) {
     
      
        this.applicationType = "organization";
        const documentType = "document3Id";
        this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOrganizationMandatory_1, this.applicationType, documentType);
    
    }
  }
  cancelOrganizationMandatory_1() {
    this.fileOrganizationMandatory_1 = null;
    this.fileNameOrganizationMandatory_1 = '';
    this.isOrganizationMandatory_1Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  onOrganizationMandatory_2Selected(event: any) {
    this.fileOrganizationMandatory_2 = event.target.files[0];
    this.fileNameOrganizationMandatory_2 = this.fileOrganizationMandatory_2?.name;
    this.isOrganizationMandatory_2Selected = false;
  }
  submitOrganizationMandatory_2() {
    if (this.fileOrganizationMandatory_2) {
      this.applicationType = "organization";
      const documentType = "document4Id";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOrganizationMandatory_2, this.applicationType, documentType);
  }
}
  cancelOrganizationMandatory_2() {
    this.fileOrganizationMandatory_2 = null;
    this.fileNameOrganizationMandatory_2 = '';
    this.isOrganizationMandatory_2Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';
  }

onOrganizationMandatory_3Selected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameOrganizationMandatory_3) {
      this.fileOrganizationMandatory_3 = event.target.files[0];
      this.fileNameOrganizationMandatory_3 = this.fileOrganizationMandatory_3?.name;
      this.isOrganizationMandatory_3Selected = false;
    }
    this.fileSelectedBefore = true;
    
  }
  submitOrganizationMandatory_3() {
    if (this.fileOrganizationMandatory_3) {
     
      this.applicationType = "organization";
      const documentType = "document5Id";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOrganizationMandatory_3, this.applicationType, documentType);
    }
  }
  cancelOrganizationMandatory_3() {
    this.fileOrganizationMandatory_3 = null;
    this.fileNameOrganizationMandatory_3 = '';
    this.isOrganizationMandatory_3Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  onOrganizationMandatory_4Selected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameOrganizationMandatory_4) {
      this.fileOrganizationMandatory_4 = event.target.files[0];
      this.fileNameOrganizationMandatory_4 = this.fileOrganizationMandatory_4?.name;
      this.isOrganizationMandatory_4Selected = false;
    }
    this.fileSelectedBefore = true;
    
  }
  submitOrganizationMandatory_4() {
    if (this.fileOrganizationMandatory_4) {
     
      this.applicationType = "organization";
      const documentType = "document6Id";
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOrganizationMandatory_4, this.applicationType, documentType);
    }
  }
  cancelOrganizationMandatory_4() {
    this.fileOrganizationMandatory_4 = null;
    this.fileNameOrganizationMandatory_4 = '';
    this.isOrganizationMandatory_4Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  

}

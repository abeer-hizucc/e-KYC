import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApplicationUploadService } from 'src/app/Services/application-service/application-upload.service';
import { ApplicationDocumentUploadService } from 'src/app/Services/application-service/document-upload-application.service';
import { IndividualApplicationService } from 'src/app/Services/application-service/individual-application-save.service';
import { OrganizationApplicationService } from 'src/app/Services/application-service/organization-application.service';
import { IndividualApplicationModel } from 'src/app/models/application-models/individual-application.model';
import { OrganizationApplicationModel } from 'src/app/models/application-models/organization-application.model';

@Component({
  selector: 'app-other-documents',
  templateUrl: './other-documents.component.html',
  styleUrls: ['./other-documents.component.scss']
})
export class OtherDocumentsComponent {
  @Input() requiredFileType!: string;
  fileSelectedBefore: boolean = false;
  fileNameOtherDocument1!: string | undefined;
  fileNameOtherDocument2!: string | undefined;


  fileOtherDocument1!: File | null;
  fileOtherDocument2!: File | null;

  applicationType!: string;
  isOtherDocument1Selected: boolean = true;
  isOtherDocument2Selected: boolean = true;


  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @ViewChild('fileUpload2') fileUpload2: ElementRef | undefined;
  

  constructor(
    private individualApplicationService:IndividualApplicationService,
    private organizationApplicationService:OrganizationApplicationService,
    private applicationDocumentUploadService: ApplicationDocumentUploadService,
    private applicationUploadService:ApplicationUploadService
  ) { }
  ngOnInit(): void {

  }

  onOtherDocument1Selected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameOtherDocument1) {
      this.fileOtherDocument1 = event.target.files[0];
      this.fileNameOtherDocument1= this.fileOtherDocument1?.name;
      this.isOtherDocument1Selected = false;
    }
    this.fileSelectedBefore = true;

  }
  submitOtherDocument1() {
    if (this.fileOtherDocument1) {
      this.applicationType = sessionStorage.getItem("applicationType")!;
      const documentType = 'document7Id';
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOtherDocument1, this.applicationType, documentType);

    }
  }
  cancelOtherDocument1() {
    this.fileOtherDocument1 = null;
    this.fileNameOtherDocument1 = '';
    this.isOtherDocument1Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  onOtherDocument2Selected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameOtherDocument2) {
      this.fileOtherDocument2 = event.target.files[0];
      this.fileNameOtherDocument2= this.fileOtherDocument2?.name;
      this.isOtherDocument2Selected = false;
    }
    this.fileSelectedBefore = true;

  }
  submitOtherDocument2() {
    if (this.fileOtherDocument2) {
      this.applicationType = sessionStorage.getItem("applicationType")!;
      const documentType = 'document8Id';
      this.applicationDocumentUploadService.applicationDocumentUpload(this.fileOtherDocument2, this.applicationType, documentType);

    }
  }
  cancelOtherDocument2() {
    this.fileOtherDocument2 = null;
    this.fileNameOtherDocument2 = '';
    this.isOtherDocument2Selected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload2?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
onSubmit() {
  const applicationType = sessionStorage.getItem('applicationType')!;
  if(applicationType === 'individual'){
    const individualApplicationInfo: IndividualApplicationModel = {
      certificateType: this.individualApplicationService.getCertificateType() as string,
      certificateClass: this.individualApplicationService.getCertificateClass() as string,
      certificateValidityYears: this.individualApplicationService.getCertificateValidityYears() as number,
      houseNumber:this.individualApplicationService.getHouseNumber() as string,
      streetAddress:this.individualApplicationService.getStreetAddress() as string,
      city:this.individualApplicationService.getCity() as string,
      postCode:this.individualApplicationService.getPostCode() as string,
      district:this.individualApplicationService.getDistrict() as string,
      country:this.individualApplicationService.getCountry() as string,
      utilityBillType:this.individualApplicationService.getUtilityBillType() as string,
      document1Id:this.individualApplicationService.getDocument1Id() as string,
      document2Id:this.individualApplicationService.getDocument2Id() as string,
      document7Id:this.individualApplicationService.getDocument7Id() as string,
      document8Id:this.individualApplicationService.getDocument8Id() as string

  } 
  //const userId = this.route.snapshot.params['userId'];
 this.applicationUploadService.uploadIndividualApplication(individualApplicationInfo);

}
else if(applicationType === 'organization'){
  const organizationApplicationInfo:OrganizationApplicationModel = {
    certificateType: this.organizationApplicationService.getCertificateType() as string,
    certificateClass: this.organizationApplicationService.getCertificateClass() as string,
    certificateValidityYears: this.organizationApplicationService.getCertificateValidityYears() as number,
    houseNumber: this.organizationApplicationService.getHouseNumber() as string,
    streetAddress: this.organizationApplicationService.getStreetAddress() as string,
    city: this.organizationApplicationService.getCity() as string,
    postCode: this.organizationApplicationService.getPostCode() as string,
    district: this.organizationApplicationService.getDistrict() as string,
    country: this.organizationApplicationService.getCountry() as string,
    orgHouseNumber: this.organizationApplicationService.getOrgHouseNumber() as string,
    orgStreetAddress: this.organizationApplicationService.getOrgStreetAddress() as string,
    orgCity: this.organizationApplicationService.getOrgCity() as string,
    orgPostCode: this.organizationApplicationService.getOrgPostCode() as string,
    orgDistrict: this.organizationApplicationService.getOrgDistrict() as string,
    orgCountry: this.organizationApplicationService.getOrgCountry() as string,
    orgType: this.organizationApplicationService.getOrgType() as string,
    orgName: this.organizationApplicationService.getOrgName() as string,
    orgEmail: this.organizationApplicationService.getOrgEmail() as string,
    orgPhoneNumber: this.organizationApplicationService.getOrgPhoneNumber() as string,
    applicantDesignation: this.organizationApplicationService.getApplicantDesignation() as string,
    applicantDepartment: this.organizationApplicationService.getApplicantDepartment() as string,
    utilityBillType: this.organizationApplicationService.getUtilityBillType() as string,
    document1Id: this.organizationApplicationService.getDocument1Id() as string,
    document2Id: this.organizationApplicationService.getDocument2Id() as string,
    document3Id: this.organizationApplicationService.getDocument3Id() as string,
    document4Id: this.organizationApplicationService.getDocument4Id() as string,
    document5Id: this.organizationApplicationService.getDocument5Id() as string,
    document6Id: this.organizationApplicationService.getDocument6Id() as string,
    document7Id: this.organizationApplicationService.getDocument7Id() as string,
    document8Id: this.organizationApplicationService.getDocument8Id() as string,
    
  }
  //const userId = this.route.snapshot.params['userId'];
this.applicationUploadService.uploadOrganizationApplication(organizationApplicationInfo);
 
}
}
}

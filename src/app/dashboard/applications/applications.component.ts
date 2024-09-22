import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationTypeComponent } from './application-type/application-type.component';
import { MatStepper } from '@angular/material/stepper';
import { ResidentialAddressComponent } from './residential-address/residential-address.component';
import { OrganizationalDocumentComponent } from './organizational-document/organizational-document.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OtherDocumentsComponent } from './other-documents/other-documents.component';
import { GetUserApplicantInfoFromBackendService } from 'src/app/Services/application-service/get-user-applicant-info.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  isCertifioateInfoComplete: boolean = false;
  isResidentialAddressComplete: boolean = false;
  isOrganizationalDocumentComplete: boolean = false;
  isOrganizationDetailsComplete: boolean = false;
  userInfoFromBackend$!: Observable<any>;
  constructor(
    private cdr: ChangeDetectorRef,
    private getUserApplicantInfoFromBackendService: GetUserApplicantInfoFromBackendService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getUserApplicantInfoFromBackendService.setuserId(this.route.snapshot.paramMap.get('userId')!);
    this.userInfoFromBackend$ = this.getUserApplicantInfoFromBackendService.getIndividualApplicationInfo();
  }

  @ViewChild(ApplicationTypeComponent, { static: false }) applicationTypeComponent!: ApplicationTypeComponent;
  @ViewChild(ResidentialAddressComponent, { static: false }) residentialAddressComponent!: ResidentialAddressComponent;
  @ViewChild(OrganizationalDocumentComponent, { static: false }) organizationalDocumentComponent!: OrganizationalDocumentComponent;
  @ViewChild(OrganizationDetailsComponent, { static: false }) organizationDetailsComponent!: OrganizationDetailsComponent;
  @ViewChild(OtherDocumentsComponent, { static: false }) otherDocumentsComponent!: OtherDocumentsComponent;
  @ViewChild(MatStepper) stepper!: MatStepper;
  selectedApplicationType: string = 'individual';

  onApplicationTypeSelected(event: string) {

    this.selectedApplicationType = event;
  }
  onCertificateInfoCompletion(isComplete: boolean) {
    this.isCertifioateInfoComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.next();

  }
  onResidentialAddressCompletion(isComplete: boolean) {
    if (isComplete) {
      this.isResidentialAddressComplete = isComplete;
      this.cdr.detectChanges();
      this.stepper.next();
    }
  }
  onOrganizationalDetailsCompletion(isComplete: boolean) {
    if (isComplete) {
      this.isOrganizationDetailsComplete = isComplete;
      this.cdr.detectChanges();
      this.stepper.next();
    }
  }
}

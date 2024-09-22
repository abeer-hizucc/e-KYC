import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndividualApplicationService } from './individual-application-save.service';
import { OrganizationApplicationService } from './organization-application.service';

@Injectable()
export class CertificateInfoUploadService {
  constructor(
    private individualApplicationService: IndividualApplicationService,
    private organizationApplicationService: OrganizationApplicationService,
    private snackBar: MatSnackBar
  ) {}

  private serviceMap: Record<string, any> = {
    individual: this.individualApplicationService,
    organization: this.organizationApplicationService,
  };

  uploadCertificateInfo(
    certificateClass: string,
    certificateValidityYears: number,
    applicationType: string,
    certficateType: string
  ): boolean {
    const service = this.serviceMap[applicationType];

    if (service) {
      this.setCertificateInfo(
        service,
        certificateClass,
        certificateValidityYears,
        certficateType
      );
      this.snackBar.open(`Successfully Uploaded Application Info`, 'Close', {
        duration: 3000,
        panelClass:['mat-snack-bar-success','mat-snackbar-size']
      });
      return true;
    } else {
      this.snackBar.open(`Error While Uploading Application Info`, 'Close', {
        duration: 3000,
        panelClass:['mat-snack-bar-error','mat-snackbar-size']
      });
      return false;
    }
  }

  private setCertificateInfo(
    service: any,
    certificateClass: string,
    certificateValidityYears: number,
    certficateType: string
  ) {
    service.setCertificateClass(certificateClass);
    service.setCertificateValidityYears(certificateValidityYears);
    service.setCertificateType(certficateType);
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndividualApplicationService } from './individual-application-save.service';
import { OrganizationApplicationService } from './organization-application.service';

@Injectable()
export class ResidentialAddressUploadService {
  constructor(
    private individualApplicationService: IndividualApplicationService,
    private organizationApplicationService: OrganizationApplicationService,
    private snackBar: MatSnackBar
  ) {}

  private serviceMap: Record<string, any> = {
    individual: this.individualApplicationService,
    organization: this.organizationApplicationService,
  };

  uploadResidentialAddressInfo(
    houseNumber: string,
    streetAddress: string,
    city: string,
    postCode: string,
    district: string,
    country: string,
    applicationType: string
  ): boolean {
    const service = this.serviceMap[applicationType];

    if (service) {
      this.setCertificateInfo(
        service,
        houseNumber,
        streetAddress,
        city,
        postCode,
        district,
        country
      );
      this.snackBar.open(`Successfully Uploaded Residential Address`, 'Close', {
        duration: 3000,
        panelClass:['mat-snack-bar-success','mat-snackbar-size']
      });
      return true;
    } else {
      this.snackBar.open(`Error While Uploading Residential Address`, 'Close', {
        duration: 3000,
        panelClass:['mat-snack-bar-error','mat-snackbar-size']
      });
      return false;
    }
  }

  private setCertificateInfo(
    service: any,
    houseNumber: string,
    streetAddress: string,
    city: string,
    postCode: string,
    district: string,
    country: string
  ) {
    service.setHouseNumber(houseNumber);
    service.setStreetAddress(streetAddress);
    service.setCity(city);
    service.setPostCode(postCode);
    service.setDistrict(district);
    service.setCountry(country);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { OrganizationApplicationService } from 'src/app/Services/application-service/organization-application.service';
import { district, upazila } from 'src/app/models/application-models/geocode';
import { CustomPhoneNumberValidator } from 'src/app/validators/phoneNumber.validator';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent {
  organizationDetailForm!: FormGroup;
  @Output() onFormCompletion: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  districtSuggestion = this.extractNames(district);
  citySuggestions = this.extractNames(upazila);
  filteredDistrictOptions!: Observable<string[]>;
  filteredCityOptions!: Observable<string[]>;
  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private organizationApplicationService: OrganizationApplicationService
  ) {}
  ngOnInit(): void {
    this.organizationDetailForm = this.formBuilder.group({
      orgName: ['', Validators.required],
      orgPhoneNumber: ['', [Validators.required,CustomPhoneNumberValidator.phoneNumber()]],
      orgEmail: ['', [Validators.required, Validators.email]],
      applicantDesignation: ['', Validators.required],
      applicantDepartment: ['', Validators.required],
      orgHouseNumber: ['', Validators.required],
      orgStreetAddress: ['', Validators.required],
      orgCity: ['', Validators.required],
      orgPostCode: ['', Validators.required],
      orgDistrict: ['', Validators.required],
      orgCountry: ['', Validators.required],
    });
    this.filteredDistrictOptions = this.organizationDetailForm
      .get('orgDistrict')!
      .valueChanges.pipe(
        startWith(''),
        map((value: string) =>
          this._filter(value || '', this.districtSuggestion)
        )
      );

    this.filteredCityOptions = this.organizationDetailForm
      .get('orgCity')!
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter(value || '', this.citySuggestions))
      );
  }

  private _filter(value: string, suggestions: string[]): string[] {
    const filterValue = value.toLowerCase();

    return suggestions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onSubmit() {
    if (this.organizationDetailForm.valid) {
      this.organizationApplicationService.setOrgName(
        this.organizationDetailForm.get('orgName')!.value
      );
      this.organizationApplicationService.setOrgPhoneNumber(
        this.organizationDetailForm.get('orgPhoneNumber')!.value
      );
      this.organizationApplicationService.setApplicantDesignation(
        this.organizationDetailForm.get('applicantDesignation')!.value
      );
      this.organizationApplicationService.setApplicantDepartment(
        this.organizationDetailForm.get('applicantDepartment')!.value
      );
      this.organizationApplicationService.setOrgHouseNumber(
        this.organizationDetailForm.get('orgHouseNumber')!.value
      );
      this.organizationApplicationService.setOrgStreetAddress(
        this.organizationDetailForm.get('orgStreetAddress')!.value
      );
      this.organizationApplicationService.setOrgCity(
        this.organizationDetailForm.get('orgCity')!.value
      );
      this.organizationApplicationService.setOrgEmail(
        this.organizationDetailForm.get('orgEmail')!.value
      );
      this.organizationApplicationService.setOrgPostCode(
        this.organizationDetailForm.get('orgPostCode')!.value
      );
      this.organizationApplicationService.setOrgDistrict(
        this.organizationDetailForm.get('orgDistrict')!.value
      );
      this.organizationApplicationService.setOrgCountry(
        this.organizationDetailForm.get('orgCountry')!.value
      );

      this.onFormCompletion.emit(true);
      this.snackbar.open(`Successfully Uploaded Application Info`, 'Close', {
        duration: 3000,
        panelClass: ['mat-snack-bar-success','mat-snackbar-size'],
      });
    } else {
      this.snackbar.open('Please Fill The Form Correctly', 'Close', {
        duration: 3000,
        panelClass: ['mat-snack-bar-error','mat-snackbar-size'],
      });
    }
  }
  extractNames(data: any[]): string[] {
    return data.map((item) => item.name);
  }
  onDistrictSelected(event: MatAutocompleteSelectedEvent) {
    if (event) {
      console.log(event);
      const selectedDistrict = event.option.value;
      const districtId = district.find((d) => d.name === selectedDistrict)?.id;
      if (districtId) {
        this.filteredCityOptions = this.organizationDetailForm
          .get('city')!
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filterCity(value || '', districtId))
          );
      }
    }
  }
  onDistrictSelectedManually(event: any) {
    if (event) {
      console.log(event);
      const selectedDistrict = event.target.value;
      const districtId = district.find((d) => d.name === selectedDistrict)?.id;
      if (districtId) {
        this.filteredCityOptions = this.organizationDetailForm
          .get('city')!
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filterCity(value || '', districtId))
          );
      }
    }
  }

  private _filterCity(value: string, districtId: string): string[] {
    const filterValue = value.toLowerCase();

    return upazila
      .filter((city) => city.district_id === districtId)
      .map((city) => city.name)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }
}

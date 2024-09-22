import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { ResidentialAddressUploadService } from 'src/app/Services/application-service/residential-address.service';
import { district, upazila } from 'src/app/models/application-models/geocode';
@Component({
  selector: 'app-residential-address',
  templateUrl: './residential-address.component.html',
  styleUrls: ['./residential-address.component.scss']
})
export class ResidentialAddressComponent implements OnInit{
  residentialAddressForm!:FormGroup;
  districtSuggestion = this.extractNames(district);
  citySuggestions = this.extractNames(upazila);
  filteredDistrictOptions!: Observable<string[]>;
  filteredCityOptions!: Observable<string[]>;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
constructor(
  private formBuilder:FormBuilder,
  private snackBar: MatSnackBar,
  private residentialAddressUploadService:ResidentialAddressUploadService
  ){}
  ngOnInit(): void {
    this.residentialAddressForm = this.formBuilder.group({
      houseNumber: ['',Validators.required],
      streetAddress: ['',Validators.required],
      city: ['',Validators.required],
      postCode: ['',Validators.required],
      district: ['',Validators.required],
      country: ['Bangladesh',Validators.required]
  });
  this.filteredDistrictOptions = this.residentialAddressForm.get('district')!.valueChanges.pipe(
    startWith(''),
    map((value: string) => this._filter(value || '', this.districtSuggestion))
  );
  
  this.filteredCityOptions = this.residentialAddressForm.get('city')!.valueChanges.pipe(
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

onSubmit(){
  if(this.residentialAddressForm.valid){
    const houseNumber = this.residentialAddressForm.get('houseNumber')!.value;
    const streetAddress = this.residentialAddressForm.get('streetAddress')!.value;
    const city = this.residentialAddressForm.get('city')!.value;
    const postCode = this.residentialAddressForm.get('postCode')!.value;
    const district = this.residentialAddressForm.get('district')!.value;
    const country = this.residentialAddressForm.get('country')!.value;
    const applicationType = sessionStorage.getItem('applicationType')!;
   const value = this.residentialAddressUploadService.uploadResidentialAddressInfo(
    houseNumber,
    streetAddress,
    city,
    postCode,
    district,
    country,
    applicationType
    );
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
 extractNames(data: any[]): string[] {
  return data.map(item => item.name);
}
onDistrictSelected(event: MatAutocompleteSelectedEvent) {
  if (event) {
    console.log(event);
    const selectedDistrict = event.option.value;
    const districtId = district.find((d) => d.name === selectedDistrict)?.id;
    if (districtId) {
      this.filteredCityOptions = this.residentialAddressForm.get('city')!.valueChanges.pipe(
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
      this.filteredCityOptions = this.residentialAddressForm.get('city')!.valueChanges.pipe(
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

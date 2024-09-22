import { Injectable } from '@angular/core';

@Injectable()
export class IndividualApplicationService {
    private certificateType!: string | null;
    private certificateClass!: string | null;
    private certificateValidityYears!: number | null;
    private houseNumber!: string | null;
    private streetAddress!: string | null;
    private city!: string | null;
    private postCode!: string | null;
    private district!: string | null;
    private country!: string | null;
    private document1Id!: string | null;
    private utilityBillType!: string | null;
    private document2Id!: string | null;
    private document7Id!: string | null;
    private document8Id!: string | null;

  // Certificate Type
  setCertificateType(certificateType: string) {
    this.certificateType = certificateType;
  }

  getCertificateType(): string | null {
    return this.certificateType;
  }

  // Certificate Class
  setCertificateClass(certificateClass: string) {
    this.certificateClass = certificateClass;
  }

  getCertificateClass(): string | null {
    return this.certificateClass;
  }

  // Certificate Validity Years
  setCertificateValidityYears(certificateValidityYears: number) {
    this.certificateValidityYears = certificateValidityYears;
  }

  getCertificateValidityYears(): number | null {
    return this.certificateValidityYears;
  }

  // House Number
  setHouseNumber(houseNumber: string) {
    this.houseNumber = houseNumber;
  }

  getHouseNumber(): string | null {
    return this.houseNumber;
  }

  // Street Address
  setStreetAddress(streetAddress: string) {
    this.streetAddress = streetAddress;
  }

  getStreetAddress(): string | null {
    return this.streetAddress;
  }

  // City
  setCity(city: string) {
    this.city = city;
  }

  getCity(): string | null {
    return this.city;
  }

  // Post Code
  setPostCode(postCode: string) {
    this.postCode = postCode;
  }

  getPostCode(): string | null {
    return this.postCode;
  }

  // District
  setDistrict(district: string) {
    this.district = district;
  }

  getDistrict(): string | null {
    return this.district;
  }

  // Country
  setCountry(country: string) {
    this.country = country;
  }

  getCountry(): string | null {
    return this.country;
  }



  // Passport Document Id
  setDocument1Id(document1Id: string) {
    this.document1Id = document1Id;
  }

  getDocument1Id(): string | null {
    return this.document1Id;
  }

  // Utility Bill Type
  setUtilityBillType(utilityBillType: string) {
    this.utilityBillType = utilityBillType;
  }

  getUtilityBillType(): string | null {
    return this.utilityBillType;
  }

  // Utility Bill Document Id
  setDocument2Id(document2Id: string) {
    this.document2Id = document2Id;
  }

  getDocument2Id(): string | null {
    return this.document2Id;
  }

  // Other Document Id
  setDocument7Id(document7Id: string) {
    this.document7Id = document7Id;
  }

  getDocument7Id(): string | null {
    return this.document7Id;
  }
  setDocument8Id(document8Id: string) {
    this.document8Id = document8Id;
  }
  getDocument8Id(): string | null {
    return this.document8Id;
  }
  // Clear all field values
  clearAllFields() {
    this.certificateType = null;
    this.certificateClass = null;
    this.certificateValidityYears = null;
    this.houseNumber = null;
    this.streetAddress = null;
    this.city = null;
    this.postCode = null;
    this.district = null;
    this.country = null;
    this.document1Id = null;
    this.utilityBillType = null;
    this.document2Id = null;
    this.document7Id = null;
    this.document8Id = null;
  }
}

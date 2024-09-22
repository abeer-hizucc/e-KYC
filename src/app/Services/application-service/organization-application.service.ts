import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationApplicationService {
  private certificateType!: string | null;
  private certificateClass!: string | null;
  private certificateValidityYears!: number | null;
  private houseNumber!: string | null;
  private streetAddress!: string | null;
  private city!: string | null;
  private postCode!: string | null;
  private district!: string | null;
  private country!: string | null;
  private orgType!: string | null;
  private orgName!: string | null;
  private orgEmail!: string | null;
  private applicantDesignation!: string | null;
  private applicantDepartment!: string | null;
  private orgHouseNumber!: string | null;
  private orgStreetAddress!: string | null;
  private orgCity!: string | null;
  private orgPostCode!: string | null;
  private orgDistrict!: string | null;
  private orgCountry!: string | null;
  private orgPhoneNumber!: string | null;
  private document3Id!: string | null;
  private document2Id!: string | null;
  private document1Id!: string | null;
  private utilityBillType!: string | null;
  private document4Id!: string | null;
  private document5Id!: string | null;
  private document6Id!: string | null;
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

  // Org Type
  setOrgType(orgType: string) {
    this.orgType = orgType;
  }

  getOrgType(): string | null {
    return this.orgType;
  }
  getOrgEmail(): string | null {
    return this.orgEmail;
  }
  setOrgEmail(orgEmail: string) {
    this.orgEmail = orgEmail;
  }
  // Org Name
  setOrgName(orgName: string) {
    this.orgName = orgName;
  }

  getOrgName(): string | null {
    return this.orgName;
  }

  // Applicant Designation
  setApplicantDesignation(applicantDesignation: string) {
    this.applicantDesignation = applicantDesignation;
  }

  getApplicantDesignation(): string | null {
    return this.applicantDesignation;
  }

  // Applicant Department
  setApplicantDepartment(applicantDepartment: string) {
    this.applicantDepartment = applicantDepartment;
  }

  getApplicantDepartment(): string | null {
    return this.applicantDepartment;
  }

  // Org House Number
  setOrgHouseNumber(orgHouseNumber: string) {
    this.orgHouseNumber = orgHouseNumber;
  }

  getOrgHouseNumber(): string | null {
    return this.orgHouseNumber;
  }

  // Org Street Address
  setOrgStreetAddress(orgStreetAddress: string) {
    this.orgStreetAddress = orgStreetAddress;
  }

  getOrgStreetAddress(): string | null {
    return this.orgStreetAddress;
  }

  // Org City
  setOrgCity(orgCity: string) {
    this.orgCity = orgCity;
  }

  getOrgCity(): string | null {
    return this.orgCity;
  }

  // Org Post Code
  setOrgPostCode(orgPostCode: string) {
    this.orgPostCode = orgPostCode;
  }

  getOrgPostCode(): string | null {
    return this.orgPostCode;
  }

  // Org District
  setOrgDistrict(orgDistrict: string) {
    this.orgDistrict = orgDistrict;
  }

  getOrgDistrict(): string | null {
    return this.orgDistrict;
  }

  // Org Country
  setOrgCountry(orgCountry: string) {
    this.orgCountry = orgCountry;
  }

  getOrgCountry(): string | null {
    return this.orgCountry;
  }

  // Org Phone Number
  setOrgPhoneNumber(orgPhoneNumber: string) {
    this.orgPhoneNumber = orgPhoneNumber;
  }

  getOrgPhoneNumber(): string | null {
    return this.orgPhoneNumber;
  }

  // TIN Document Id
  setDocument1Id(document1Id: string) {
    this.document1Id = document1Id;
  }

  getDocument1Id(): string | null {
    return this.document1Id;
  }

  // BIN Document Id
  setDocument2Id(document2Id: string) {
    this.document2Id = document2Id;
  }

  getDocument2Id(): string | null {
    return this.document2Id;
  }

  // Passport Document Id
  setDocument3Id(document3Id: string) {
    this.document3Id = document3Id;
  }

  getDocument3Id(): string | null {
    return this.document3Id;
  }

  // Utility Bill Type
  setUtilityBillType(utilityBillType: string) {
    this.utilityBillType = utilityBillType;
  }

  getUtilityBillType(): string | null {
    return this.utilityBillType;
  }

  // Utility Bill Document Id
  setDocument4Id(document4Id: string) {
    this.document4Id = document4Id;
  }

  getDocument4Id(): string | null {
    return this.document4Id;
  }

  // Employee ID Document Id
  setDocument5Id(document5Id: string) {
    this.document5Id = document5Id;
  }

  getDocument5Id(): string | null {
    return this.document5Id;
  }

  // Approval Letter Document Id
  setDocument6Id(document6Id: string) {
    this.document6Id = document6Id;
  }

  getDocument6Id(): string | null {
    return this.document6Id;
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
    this.orgType = null;
    this.orgName = null;
    this.applicantDesignation = null;
    this.applicantDepartment = null;
    this.orgHouseNumber = null;
    this.orgStreetAddress = null;
    this.orgCity = null;
    this.orgPostCode = null;
    this.orgDistrict = null;
    this.orgCountry = null;
    this.orgPhoneNumber = null;
    this.document1Id = null;
    this.document2Id = null;
    this.document3Id = null;
    this.utilityBillType = null;
    this.document4Id = null;
    this.document5Id = null;
    this.document6Id = null;
    this.document7Id = null;
    this.document8Id = null;
  }
}

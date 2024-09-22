export interface UserApplicationStatus {
  applicationStatusId: string,
  applicationId: string,
  applicationType: string,
  applicationStatus: string,
  applicationDate: Date,
  applicationRemarks: string,
}
export interface AdminApplicationStatusResponse {
  applicationStatusId: string,
  ekycnumber: number,
  userId: string,
  applicationId: string,
  applicationType: string,
  applicationStatus: string,
  applicationDate: Date,
  applicationRemarks: string,

}
export interface AdminApplicationStatus {
  eKYCNumber: number,
  applicationId: string,
  applicationType: string,
  applicationStatus: string,
  applicationDate: Date,
  userId: string


}
export interface UserApplicationFormResponseModel {
  "eKYCNumber": Number,
  "surName": String,
  "givenName": String,
  "fathersName": String,
  "mothersName": String,
  "gender": String,
  "nationality": String,
  "nidNumber": String,
  "dateOfBirth": String,
  "userPhotoDocumentId": string,
  "nidFrontDocumentId": string,
  "nidBackDocumentId": string
}

export interface UserApplicationFormModel {
  "eKYCNumber": Number,
  "surName": String,
  "givenName": String,
  "fathersName": String,
  "mothersName": String,
  "gender": String,
  "nationality": String,
  "nidNumber": String,
  "dateOfBirth": String,
  "userPhotoDocument": File,
  "nidFrontDocument": File,
  "nidBackDocument": File
}

interface CertificateDocument {
  otherDocument1: File;
  otherDocument2: File;
  utilityBillDocument: File;
  passportDocument: File;
  tinDocument: File;
}

export interface IndividualCertificateModel extends CertificateDocument {
  certificateType: String;
  certificateClass: String;
  certificateValidityYears: Number;
  city: String;
  country: String;
  district: String;
  postCode: String;
  streetAddress: String;
  houseNumber: String;
  utilityBillType: String;

}

export interface OrganizationCertificateModel extends CertificateDocument {
  certificateType: String;
  certificateClass: String;
  certificateValidityYears: Number;
  city: String;
  country: String;
  district: String;
  postCode: String;
  streetAddress: String;
  houseNumber: String;
  orgCity: String;
  orgCountry: String;
  orgDistrict: String;
  orgPostCode: String;
  orgStreetAddress: String;
  orgHouseNumber: String;
  orgName: String;
  orgPhoneNumber: String;
  orgType: String;
  applicantDepartment: String;
  applicantDesignation: String;
  utilityBillType: String;
  approvalLetterDocument: File,
  binDocument: File,
  employeeIdDocument: File
}

export interface ApplicationStatusResponseModel {
  userId: string,
  applicationId: string

}
export interface ApplicationStatusModel{
  "applicationStatusId:":string,
  "applicationStatus": string,
  "applicationRemarks":string
}
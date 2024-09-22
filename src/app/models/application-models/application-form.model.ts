export interface ApplicationFormModel {
      "ekycnumber":number,
      "email": String,
      "phoneNumber": String,
      "password": String,
      "surName": String,
      "givenName": String,
      "fathersName": String,
      "mothersName": String,
      "gender": String,
      "nationality": String,
      "nidNumber": String,
      "dateOfBirth": String
  }
  export interface CertificateTypeDetail{
    applicationType: string;
    organizationType: string;
    mandatoryDocuments: string[];
    optionalDocuments: string[];
  }
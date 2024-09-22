/*PEB=Passport/E-Tin/BirthCertificate*/ 
const MandatoryIndividualDocuments = ["PEB","Utility"];
const OptionalIndividualDocuments = ["Employee Id","Driver License"];
const MandatoryOrganizationalDocuments =["Organization TIN","Authorization Letter"];
const OTPLength:number = 6;
const clientId = 'e-KYC-CLIENT';
const scope = 'openid';
const backendAuthorizationIssuer:string = 'http://auth-test.dohatec-ca.com.bd:9000';
const CertificateTypeDetails =[
    {
        applicationType: "individual",
        organizationType: "",
        mandatoryDocuments:MandatoryIndividualDocuments,
        optionalDocuments:OptionalIndividualDocuments
    },
    {
        applicationType: "organization",
        organizationType: "Public Limited Company",
        mandatoryDocuments:MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments,["Certificate of Incorporation","Buisness Commencement"]),
        optionalDocuments: OptionalIndividualDocuments,
    },
    {
        applicationType: "organization",
        organizationType: "Private Limited Company",
        mandatoryDocuments:MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments,["BIN","Certificate of Incorporation"]),
        optionalDocuments: OptionalIndividualDocuments,
    },
    {
        applicationType: "organization",
        organizationType: "Partnership Firm",
        mandatoryDocuments:MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments,["Partnership Deed"]),
        optionalDocuments: OptionalIndividualDocuments,
    },
    {
        applicationType: "organization",
        organizationType: "Proprietorship Firm",
        mandatoryDocuments: MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments, ["Trade License", "VAT Certificate"]),
        optionalDocuments: OptionalIndividualDocuments,
    },
    {
        applicationType: "organization",
        organizationType: "Government",
        mandatoryDocuments: MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments),
        optionalDocuments: OptionalIndividualDocuments,
    },
    {
        applicationType: "organization",
        organizationType: "Bank",
        mandatoryDocuments: MandatoryIndividualDocuments.concat(MandatoryOrganizationalDocuments),
        optionalDocuments: OptionalIndividualDocuments,
    }
];
export const AppConfig = {
    CertificateTypeDetails:CertificateTypeDetails,
    OTPLength: OTPLength,
    clientId: clientId,
    scope : scope,
    backendAuthorizationIssuer: `${backendAuthorizationIssuer}`,

}
/*
for individual application:
Mandatory Documents: document1Id, document2Id
Optional Documents: document7Id, document8Id
for Public Limited Company:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id, document6Id
Optional Documents: document7Id, document8Id
for Private Limited Company:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id,document6Id
Optional Documents: document7Id, document8Id
for Partnership Firm:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id
Optional Documents: document7Id, document8Id
for Proprietary Firm:
Mandatory Documents: document1Id, document2Id, document3Id, document4Id, document5Id,document6Id
Optional Documents: document7Id, document8Id
for Government:
Mandatory Documents: document1Id, document2Id, document3Id
Optional Documents: document7Id, document8Id
for Bank:
Mandatory Documents: document1Id, document2Id, document3Id
Optional Documents: document7Id, document8Id

*/
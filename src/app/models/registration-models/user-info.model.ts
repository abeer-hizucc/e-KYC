export interface UserInfoModel{
    "userName": String,
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
    "dateOfBirth": String,
    "userPhotoDocumentId": String,
    "nidFrontDocumentId": String,
    "nidBackDocumentId": String
}
export interface UserProfileModel{
    "userName": String,
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
    "dateOfBirth": String,
    "userPhotoDocument": File,
    "nidFrontDocument": File,
    "nidBackDocument": File
}
import { Injectable } from "@angular/core";

@Injectable()
export class UserProfileRepositoryService{
    constructor(){}
    private userName!:string;
    private email!:string;
    private password!:string;
    private givenName!:string;
    private surName!:string;
    private fathersName!:string;
    private mothersName!:string;
    private dateOfBirth!:string;
    private phoneNumber!:string;
    private nidNumber!:string;
    private gender!:string;
    private userPhotoDocumentId!:string;
    private nidFrontDocumentId!:string;
    private nidBackDocumentId!:string;
    private nationality!:string;
    //implement getters and setters
    setUserName(userName:string){
        this.userName = userName;
    }
    getUserName(){
        return this.userName;
    }
    setGivenName(givenName:string){
        this.givenName = givenName;
    }
    getGivenName(){
        return this.givenName;
    }
    setSurName(surName:string){
        this.surName = surName;
    }
    getSurName(){
        return this.surName;
    }
    setFathersName(fathersName:string){
        this.fathersName = fathersName;
    }
    getFathersName(){
        return this.fathersName;
    }
    setMothersName(mothersName:string){
        this.mothersName = mothersName;
    }
    getMothersName(){
        return this.mothersName;
    }
    setDateOfBirth(dateOfBirth:string){
        this.dateOfBirth = dateOfBirth;
    }
    getDateOfBirth(){
        return this.dateOfBirth;
    }
    setPhoneNumber(phoneNumber:string){
        this.phoneNumber = phoneNumber;
    }
    getPhoneNumber(){
        return this.phoneNumber;
    }
    setNidNumber(nidNumber:string){
        this.nidNumber = nidNumber;
    }
    getNidNumber(){
        return this.nidNumber;
    }
    setUserPhotoDocumentId(userPhotoDocumentId:string){
        this.userPhotoDocumentId = userPhotoDocumentId;
    }
    getUserPhotoDocumentId(){
        return this.userPhotoDocumentId;
    }
    setNidFrontDocumentId(nidFrontDocumentId:string){
        this.nidFrontDocumentId = nidFrontDocumentId;
    }
    getNidFrontDocumentId(){
        return this.nidFrontDocumentId;
    }
    setNidBackDocumentId(nidBackDocumentId:string){
        this.nidBackDocumentId = nidBackDocumentId;
    }
    getNidBackDocumentId(){
        return this.nidBackDocumentId;
    }
    setGender(gender:string){
        this.gender = gender;
    }
    getGender(){
        return this.gender;
    }
    setnationality(nationality:string){
        this.nationality = nationality;
    }
    getNationality(){
        return this.nationality;
    }
    getEmail(){
        return this.email;
    }
    setEmail(email:string){
        this.email = email;
    }
    getPassword(){
        return this.password;
    }
    setPassword(password:string){
        this.password = password;
    }
    
}
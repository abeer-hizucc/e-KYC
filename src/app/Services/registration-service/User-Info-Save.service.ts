import { Injectable } from "@angular/core";
import { PasswordeModel } from "src/app/models/registration-models/password.model";
import { RegistrationFormModel } from "src/app/models/registration-models/registration-form.model";

@Injectable()
export class SaveUserInfoService {
  private frontCoverPhotoId: string | null = null;
  private backCoverPhotoId: string | null = null;
  private IndividualPhotoId: string | null = null;
  private registrationForm: RegistrationFormModel | null = null;
  private passwordInfo: PasswordeModel | null = null;
  private nid: string | null = null;
  private dob: string | null = null;

  setIndividualPhotoId(id:string) {
    this.IndividualPhotoId = id;
  }
  getIndividualPhotoId() {
    return this.IndividualPhotoId;
  }
  saveBackCoverPhotoId(id:string) {
    this.backCoverPhotoId = id;
  }

  getBackCoverPhotoId(): string | null {
    return this.backCoverPhotoId;
  }
  getNid(): string | null {
    return this.nid;
  }
  setNid(nid:string) {
    this.nid = nid;
  }
  getDob(): string | null {
    return this.dob;
  }
  setDob(dob:string) {
    this.dob = dob;
  }
  clearBackCoverPhotoId() {
    this.backCoverPhotoId = null;
  }
  saveFrontCoverPhotoId(id:string) {
    this.frontCoverPhotoId = id;
  }
  getFrontCoverPhotoId(): string | null {
    return this.frontCoverPhotoId;
  }
  clearFrontCoverPhotoId() {
    this.frontCoverPhotoId = null;
  }
  saveRegistrationForm(form: RegistrationFormModel) {
    this.registrationForm = form;
  }
  getRegistrationForm(): RegistrationFormModel | null {
    return this.registrationForm;
  }
  clearRegistrationForm(){
    this.registrationForm = null;
  }
  savePasswordInfo(passwordInfo: PasswordeModel) {
    this.passwordInfo = passwordInfo;
  }
  getPasswordInfo(): PasswordeModel | null {
    return this.passwordInfo;
  }
  clearUserInfo(){
    this.backCoverPhotoId = null;
    this.IndividualPhotoId = null;
    this.frontCoverPhotoId = null;
    this.registrationForm = null;
    this.passwordInfo = null;
  }

}
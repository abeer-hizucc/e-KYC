import { ChangeDetectorRef, Component, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PasswordComponent } from './password/password.component';
import { NIDResponseModel,NIDResponsePorichoyModel } from 'src/app/models/registration-models/nid-response.model';
import { NidServerResponseService } from 'src/app/Services/registration-service/nid-server-response.service';
import { ConfirmationInfoComponent } from './confirmation-info/confirmation-info.component';
import { MatStepper } from '@angular/material/stepper';
import { VerifyEmailComponent } from './verify-email/verify-email.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  isNIDUploadComplete: boolean = false;
  isConfirmInfoComplete: boolean = false;
  isPersonalInfoComplete: boolean = false;
  isPersonalPhotoComplete: boolean = false;
  isPasswordComplete: boolean = false;
  isVerifyEmailComplete: boolean = false;
  
  isLinear = true;
  constructor(
    private nidSreverResponseService: NidServerResponseService,
    private cdr:ChangeDetectorRef
  ) { }

  nidResponseInfo$: Observable<NIDResponsePorichoyModel | null> = this.nidSreverResponseService.getResponseData();
  @ViewChild(RegistrationFormComponent, { static: false }) registrationFormComponent!: RegistrationFormComponent;
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(PasswordComponent, { static: false }) passwordComponent!: PasswordComponent;
  @ViewChild(VerifyEmailComponent, { static: false }) verifyEmailComponent!: VerifyEmailComponent;
  @ViewChild(ConfirmationInfoComponent, { static: false }) confirmationInfoComponent!: ConfirmationInfoComponent;

  onNIDUploadCompletion(isComplete: boolean) {
    this.isNIDUploadComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.next();
  }

 
  onConfirmInfoCompletion(isComplete: boolean) {

    this.isConfirmInfoComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.next();
  }
  onPersonalInfoCompletion(isComplete: boolean) {
    this.isPersonalInfoComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.next();
   
  }

  onPasswordCompletion(isComplete: boolean) {
    this.isPasswordComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.next();

  }
  onVerifyEmailCompletion(isComplete: boolean) {
    this.isVerifyEmailComplete = isComplete;
    this.cdr.detectChanges();
    this.stepper.reset();
  }

}

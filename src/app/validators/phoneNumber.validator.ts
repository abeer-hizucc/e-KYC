import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomPhoneNumberValidator {
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value as string;

      const isValid = /^\d{11}$/.test(phoneNumber) && phoneNumber.startsWith('01');

      return isValid ? null : { phoneNumber: true };
    };
  }
}

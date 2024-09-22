import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator{
    //password validator. password length should be within 6 to 21 characters and should contain at least one uppercase, one lowercase and one number.
    static correctPassword():ValidatorFn{
        return (control:AbstractControl):ValidationErrors | null =>{
            const value = control.value;
            const UpperCase = /[A-Z]/.test(value);
            const LowerCase = /[a-z]/.test(value);
            const Number = /[0-9]/.test(value);
            const symbol = /\W/.test(value);
            const isLengthValid =value? value.length>=8 && value.length<=21:false;
            const passwordValid = UpperCase || LowerCase && Number && isLengthValid &&symbol;
            return passwordValid? null:{passwordValidity:true};
        }
    }
}
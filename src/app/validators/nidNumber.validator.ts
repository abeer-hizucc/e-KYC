import { ValidatorFn } from "@angular/forms";

export class NIDNumberValidator{
    static nidNumber(): ValidatorFn {
        return (control: any): { [key: string]: any } | null => {
            const value = control.value;
            const isValid = /^[0-9]*$/.test(value) && value.length==10 || value.length==17;
            return isValid ? null : { nidNumberValidity: true };
        };
    }
}
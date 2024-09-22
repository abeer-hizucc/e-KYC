import { AbstractControl, ValidationErrors } from '@angular/forms';
export class ImageValidation{
   static imageValidator(control: AbstractControl): ValidationErrors | null {
        const file = control.value;
        if (file) {
          const fileSizeInBytes = file.size;
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
          const fileType = file.type;
          if (fileSizeInMB > 5) {
            return { 'maxSize': true };
          }
          if (!(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg')) {
            return { 'invalidType': true };
          }
        }
        return null;
       }
       
}

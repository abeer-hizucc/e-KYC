import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as dayjs from "dayjs";
import { Observable } from "rxjs";
import { SaveUserInfoService } from "src/app/Services/registration-service/User-Info-Save.service";
import { ConfirmInfoService } from "src/app/Services/registration-service/confirm-info.service";

import { ConfirmInfoModel } from "src/app/models/registration-models/confirm-info.model";
import { ImageValidation } from "src/app/validators/image.validator";
import { NIDNumberValidator } from "src/app/validators/nidNumber.validator";
@Component({
    selector: "app-confirmation-info",
    templateUrl: "./confirmation-info.component.html",
    styleUrls: ["./confirmation-info.component.scss"]
})
export class ConfirmationInfoComponent implements OnInit {
    confirmationInfoForm: FormGroup | any;
    isPhotoSelected: boolean = true;
    filePreview!: any;
    fileName: string | undefined;
    file!: File | null;
    fileSelectedBefore: boolean = false;
    selectedFile: File | null = null;
    @ViewChild('fileUpload') fileUpload: ElementRef | undefined;

    @Input() responseConfirmInfo!: ConfirmInfoModel | null;
    @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
    confirmInfo$!: Observable<Boolean>;
    confirmInfoLoadingSpinner = false;
    constructor(
        private formBuilder: FormBuilder,
        private confirmInfoService: ConfirmInfoService,
        private saveUserInfoService: SaveUserInfoService

    ) { }

    ngOnInit(): void {

        this.confirmationInfoForm = this.formBuilder.group({
            nidNumber: ['', [Validators.required, NIDNumberValidator.nidNumber()]],
            dateOfBirth: ['', Validators.required],
            photo: ['', [Validators.required,ImageValidation.imageValidator]]
        });
    }
    onSubmit() {
        
        if (this.confirmationInfoForm?.valid && this.selectedFile) {

            this.confirmInfoLoadingSpinner = true;
            this.fileName = this.selectedFile.name;
            const dob = dayjs(this.confirmationInfoForm.value.dateOfBirth).format("YYYY-MM-DD");
            this.confirmInfo$ = this.confirmInfoService.takeNIDInfoAndGetResponse(
                {
                    nid: this.confirmationInfoForm.value.nidNumber,
                    dob: dob,
                    photo: this.selectedFile
                }
            );
            this.saveUserInfoService.setNid(this.confirmationInfoForm.value.nidNumber);
            this.saveUserInfoService.setDob(dob);
            this.confirmInfo$.subscribe(
                (response) => {
                    this.confirmInfoLoadingSpinner = false;
                    if (response) {
                        this.onFormCompletion.emit(true);
                    }
                }
            );


        }
    }
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (!this.fileSelectedBefore || file.name !== this.fileName) {
          this.file = file;
          this.fileName = this.file?.name;
          this.isPhotoSelected = false;
          this.selectedFile = file;
          this.confirmationInfoForm.get('photo')?.setValue(this.file);
        }
        this.fileSelectedBefore = true;
        if(this.file){
            const reader = new FileReader();
            reader.onload = (e) => {
              this.filePreview = reader.result;
            }
            reader.readAsDataURL(this.file);
        }
    }
    cancel() {
        this.file = null;
        this.fileName = '';
        this.isPhotoSelected = true;
        this.fileSelectedBefore = false;
        // Reset the file input value to trigger the change event even for the same file
        const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
        fileInputElement.value = '';
      }
}

import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DocumentUploadService } from 'src/app/Services/registration-service/document-upload.service';



@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent {

  isPhotoSelected: boolean = true;
  fileName: string | undefined;
  file!: File | null;
  fileSelectedBefore: boolean = false;

  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private documentUploadService: DocumentUploadService
  ) { }

  onIndividualPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!this.fileSelectedBefore || file.name !== this.fileName) {
      this.file = file;
      this.fileName = this.file?.name;
      this.isPhotoSelected = false;
      console.log(this.isPhotoSelected);
    }
    this.fileSelectedBefore = true;
    console.log(this.isPhotoSelected);
   }
   
  submitIndividualPhoto() {

    if (this.file) {
      this.fileName = this.file.name;
      this.documentUploadService.uploadIndividualPhoto(this.file);
      const isCompleted = true;
      this.onFormCompletion.emit(isCompleted);
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



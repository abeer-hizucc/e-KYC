
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ElementRef } from '@angular/core';

import { DocumentUploadService } from 'src/app/Services/registration-service/document-upload.service';


@Component({
  selector: 'app-nid-upload',
  templateUrl: './nid-upload.component.html',
  styleUrls: ['./nid-upload.component.scss']
})
export class NidUploadComponent implements OnInit {

  @Input() requiredFileType!: string;
  fileSelectedBefore: boolean = false;
  fileNameFrontCover!: string | undefined;
  fileNameBackCover!: string | undefined;
  fileFrontCover!: File | null;
  fileBackCover!: File | null;
  isFrontCoverSelected: boolean = true;
  isBackCoverSelected: boolean = true;
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  @Output() onFormCompletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  frontCoverFilePreview!:any;
  backCoverFilePreview!:any;

  constructor(
    private snackBar: MatSnackBar,
   // private frontCoverPhotoUploadService: FrontCoverPhotoUploadService,
    private documentUploadService: DocumentUploadService
  ) { }
  ngOnInit(): void {
  }

  onFrontCoverSelected(event: any) {
    if (!this.fileSelectedBefore || event.target.files[0].name !== this.fileNameFrontCover) {
      this.fileFrontCover = event.target.files[0];
      this.fileNameFrontCover = this.fileFrontCover?.name;
      this.isFrontCoverSelected = false;
    }
    this.fileSelectedBefore = true;
    if(this.fileFrontCover){
      const frontCoverPreview = new FileReader();
      frontCoverPreview.onload = (e) => {
        this.frontCoverFilePreview = frontCoverPreview.result;
      }
      frontCoverPreview.readAsDataURL(this.fileFrontCover);
    }
  
  }
  submitFrontCover() {
    if (this.fileFrontCover) {
      this.documentUploadService.uploadFrontCoverPhoto(this.fileFrontCover);
      // this.frontCoverPhotoUploadService.onFrontCoverPhotoUploadFinished(this.fileFrontCover);
      
    }
  }
  cancelFrontCover() {
    this.fileFrontCover = null;
    this.fileNameFrontCover = '';
    this.isFrontCoverSelected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';

  }
  onBackCoverPhotoSelected(event: any) {
    this.fileBackCover = event.target.files[0];
    this.fileNameBackCover = this.fileBackCover?.name;
    this.isBackCoverSelected = false;
    if(this.fileBackCover){
      const backCoverPreview = new FileReader();
      backCoverPreview.onload = (e) => {
        this.backCoverFilePreview = backCoverPreview.result;
      }
      backCoverPreview.readAsDataURL(this.fileBackCover);
    }
  }
  submitBackCover() {
    if (this.fileBackCover) {
      this.documentUploadService.uploadBackCoverPhoto(this.fileBackCover).subscribe((isCompleted) => {
        if (isCompleted) {
          this.onFormCompletion.emit(isCompleted);
          this.snackBar.open('Back cover photo uploaded successfully', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-success', 'mat-snackbar-size']
          });
        }
      });
    }
  }
  
  cancelBackCover() {
    this.fileBackCover = null;
    this.fileNameBackCover = '';
    this.isBackCoverSelected = true;
    this.fileSelectedBefore = false;
    // Reset the file input value to trigger the change event even for the same file
    const fileInputElement = this.fileUpload?.nativeElement as HTMLInputElement;
    fileInputElement.value = '';
  }

}


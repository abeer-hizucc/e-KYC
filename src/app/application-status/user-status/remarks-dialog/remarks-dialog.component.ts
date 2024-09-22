import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remarks-dialog',
  templateUrl: './remarks-dialog.component.html',
  styleUrls: ['./remarks-dialog.component.scss'],
})
export class RemarksDialogComponent {
  closepopup() {
    this.ref.close();
  }
  remarks!:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { remarks: string,applicationStatus:string },
    private ref: MatDialogRef<RemarksDialogComponent>
  ) {
    this.remarks = data.remarks;
    console.log(this.remarks);
  }
}

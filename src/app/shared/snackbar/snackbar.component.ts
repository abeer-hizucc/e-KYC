import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
constructor(private _snackbar:MatSnackBar){}
openSnackBarSuccess(message:string){
    this._snackbar.open(message,'Close',{
        duration:3000,
        panelClass:['mat-snack-bar-success']
    })
}

openSnackBarError(message: string) {
    this._snackbar.open(message, 'Close',{
        duration: 3000,
        panelClass:['mat-snack-bar-error']
    });
}
}
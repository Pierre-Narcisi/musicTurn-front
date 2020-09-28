import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AngularFireDatabase } from "@angular/fire/database";

export interface DialogData {
    user: User,
    authService: AuthService
}

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    user: User;
    constructor(
        public authService: AuthService,
        public dialog: MatDialog,
        public db: AngularFireDatabase
    ) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ChangeNameDialog, {
            width: '250px',
            data: { user: this.user, authService: this.authService }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.authService.setUserData(result);
        });
    }

    ngOnInit(): void {
        console.log("Saucisse");
        this.db.database.ref('/users/' + JSON.parse(localStorage.getItem('user')).uid).once('value')
            .then(snapshot => {
                this.user = snapshot.val();
            });
        console.log("SAUCISSE");
    }

}

@Component({
    selector: 'change-name-dialog',
    templateUrl: 'change-name-dialog.html',
})
export class ChangeNameDialog {
    constructor(
        public dialogRef: MatDialogRef<ChangeNameDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

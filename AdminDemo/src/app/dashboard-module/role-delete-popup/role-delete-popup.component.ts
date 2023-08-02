import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptAndDecryptResponse } from 'src/app/encrypt-and-decrypt-response';
import { EncryptionAndDecryption } from 'src/app/encryption-and-decryption';


import { ServicesService } from 'src/app/services.service';
import { SignInNavResponse } from 'src/app/sign-in-nav-response';

@Component({
  selector: 'app-role-delete-popup',
  templateUrl: './role-delete-popup.component.html',
  styleUrls: ['./role-delete-popup.component.scss']
})
export class RoleDeletePopupComponent implements OnInit {


  signInNavResponse: SignInNavResponse = new SignInNavResponse();

  encryptAndDecrypt: EncryptionAndDecryption = new EncryptionAndDecryption();

  encrytAndDecrytResponse: EncryptAndDecryptResponse = new EncryptAndDecryptResponse();

  encryptandDecryptkey!: string;
  constructor(public dialogRef: MatDialogRef<RoleDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ServicesService, private cdref: ChangeDetectorRef, public Service: ServicesService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService, private router: Router) {
    this.signInNavResponse = JSON.parse(sessionStorage.getItem('UserDetails') || '');

   



  }

  deletedId!: number;

  onNoClick(): void {
    this.dialogRef.close();

    // this.reloadCurrentRoute();
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }
  confirmDelete(): void {

    this.deletedId = this.data.roleId


    const userDetails = this.deletedId + " " + this.signInNavResponse.responseContent.username;

    const encrytData = this.encryptAndDecrypt.encryptfinal(userDetails, this.encryptandDecryptkey);

    this.dataService.deleteRole(encrytData).subscribe(response => {

      const decryptData = this.encryptAndDecrypt.decryptfinal(response.data, this.encryptandDecryptkey);

      this.encrytAndDecrytResponse = JSON.parse(decryptData);

      if (this.encrytAndDecrytResponse.statusCode == "200") {


        this.snackBar.open(this.encrytAndDecrytResponse.message, '',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'center',


          });

        this.onNoClick()
      }

      else {


        this.snackBar.open(this.encrytAndDecrytResponse.message, '',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'center',


          });

      }
    })
  }
  ngOnInit(): void {




    this.Service.checkPass().subscribe(encryptKeys => {
      const keys = encryptKeys.data;
      const keyValue1 = keys.split("//");
      const firstDecrypt = this.encryptAndDecrypt.decryptfinal(keyValue1[1].trim(), keyValue1[0].trim());
      const jsonString = JSON.parse(firstDecrypt);
      const finalkeyValue = jsonString.split("|");
      const finalkeyValue1 = finalkeyValue;

      this.encryptandDecryptkey = finalkeyValue1[0].trim();

      // if (this.encryptandDecryptkey != "" || this.encryptandDecryptkey != null) {
      //   this.getValue();
      // }
    });



  
  }




  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }









}
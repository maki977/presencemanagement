import { AbsenceRequest } from './../../../../../core/services/absence-request/absence-request.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbsenceRequestService } from 'src/app/core/services/absence-request/absence-request.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


export interface ModalData {

  abs: AbsenceRequest;
}

@Component({
  selector: 'app-absence-request-form',
  templateUrl: './absence-request-form.component.html',
  styleUrls: ['./absence-request-form.component.scss'],
})
export class AbsenceRequestFormComponent implements OnInit {
  editMode!:boolean
  form!: FormGroup;
  startControl!: FormControl;
  endControl!: FormControl;
  objectRequestControl!: FormControl;
  messageControl!: FormControl;

  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<AbsenceRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private absenceRequestService: AbsenceRequestService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editMode = !!this.data.abs
    this.initFormControl();
    this.initForm();

    console.log("zzzzzzzzzzzzzzzzzzz ", this.editMode );


  }

  initForm(): void {
    this.form = new FormGroup({
      start: this.startControl,
      end: this.endControl,
      objectRequest: this.objectRequestControl,
      message: this.messageControl,
    });
  }

  initFormControl(): void {
    this.startControl = new FormControl(new Date(), [Validators.required]);
    this.endControl = new FormControl(new Date(), [Validators.required]);
    this.objectRequestControl = new FormControl(this.data?.abs?.object, [Validators.required]);
    this.messageControl = new FormControl(this.data?.abs?.message, [Validators.required]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.form.value.end);
    if (!this.editMode) {
      const absenceRequest: AbsenceRequest = {
        object: this.form.value.objectRequest,
        startTime: this.form.value.start,
        endTime: this.form.value.end,
        message: this.form.value.message,
        status: 'Pending',
        studentId: '24311a3f-6023-4219-b538-8a603379cddf',
        createdAt: new Date(),
        updatedAt: new Date(),
        nameStudent:"kone"
      };

      this.absenceRequestService
        .addAbsenceRequest(absenceRequest)
        .subscribe((res) => {
          console.log(res);
          this.openSnackBar('Demande envoyer avec succes');
          this.onNoClick();
        });

      this.form.reset;

    } else {
      const abs : AbsenceRequest= {
        object: this.form.value.objectRequest,
        startTime: this.form.value.start,
        endTime: this.form.value.end,
        message: this.form.value.message,
        studentId: '24311a3f-6023-4219-b538-8a603379cddf',
        createdAt: new Date(),
        updatedAt: new Date(),
        nameStudent:"kone",
        status: this.data.abs.status
      };
      this.absenceRequestService
        .updateAbsenceRequest(this.data.abs.id, abs)
        .subscribe((user) => {
          this.openSnackBar('Utilisateur Modifier avec succes');
          this.onNoClick();
        });
    }
    this.form.reset();


    }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 2000,
    });
  }
}

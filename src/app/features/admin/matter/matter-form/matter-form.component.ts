
import { Matter } from './../../../../core/services/matter/matter.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatterService } from './../../../../core/services/matter/matter.service';
import { matter } from 'src/app/core/models/matter';
import { Classe } from 'src/app/core/models/Classe';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
export interface matteradd {
  name:string;

}
export interface ModalData {
  matup: any;
  classe: Classe[];
  matter: matter

}

@Component({
  selector: 'app-matter-form',
  templateUrl: './matter-form.component.html',
  styleUrls: ['./matter-form.component.scss']
})
export class MatterFormComponent implements OnInit  {
  editMode!: boolean;
  Form!: FormGroup;
  nameControl!: FormControl;
  classe!: Classe[];
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<MatterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private formBuilder: FormBuilder,
    private matService: MatterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editMode = !!this.data.matter;
    this.getDataToDialog();
    this.initFormControl();
    this.initForm();

  }
  getDataToDialog(): void {
    this.classe = this.data.classe;

  }
  initForm(): void {
    this.Form = this.formBuilder.group({
      name:this.nameControl,

    });
  }
  initFormControl(): void {
    this.nameControl = new FormControl(this.data?.matter?.name, [
      Validators.required,
    ]);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Veuillez saisir au moins 6 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Trop long';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
  onSubmit(): void {
    if (!this.editMode) {
      const mat: Matter = {
        name: this.Form?.value?.name,
      };

      this.matService.CreateMatter(mat).subscribe((user) => {
        this.openSnackBar('Utilisateur creer avec succes');
        this.onNoClick();
      });
      this.Form.reset();
    } else {
      const matup:Matter = {
        name: this.Form.value.name

      };

      this.matService
        .UpdateMatter(this.data.matup.id, matup)
        .subscribe((user) => {
          this.openSnackBar('Utilisateur Modifier avec succes');
          this.onNoClick();
        });
    }
    this.Form.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 2000,
    });
  }





}

import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface ModalData {
  user: User;
}

export interface UserAdd {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userStatus: string;
  promotionId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  editMode!: boolean;
  userForm!: FormGroup;

  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  phoneControl!: FormControl;
  promotionIdControl!: FormControl;
  roleControl!: FormControl;



  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editMode = !!this.data.user;
    this.getDataToDialog();
    this.initFormControl();
    this.initForm();
  }

  getDataToDialog(): void {

  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      phone: this.phoneControl,

    });
  }

  initFormControl(): void {
    this.firstNameControl = new FormControl(this.data?.user?.firstName, [
      Validators.required,
    ]);
    this.lastNameControl = new FormControl(
      this.data?.user?.lastName,
      Validators.required
    );
    this.emailControl = new FormControl(this.data?.user?.email, [
      Validators.required,
      Validators.email,
    ]);
    this.phoneControl = new FormControl(this.data?.user?.phone, [
      Validators.required,
    ]);

    this.promotionIdControl = new FormControl(this.data?.user?.promotionId);
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
      const user: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        password: 'abcdefg',
        userStatus: 'Active',
        promotionId: this.userForm.value.promotionId,
        roleId: this.userForm.value.roleId,
        createdAt: new Date(),
        updatedAt: new Date(),
        Token: ''
      };

      this.userService.post(user).subscribe((user) => {
        this.openSnackBar('Utilisateur creer avec succes');
        this.onNoClick();
      });
      this.userForm.reset();
    } else {
      const userUpdated = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        password: this.data.user.password,
        userStatus: this.data.user.userStatus,
        promotionId:
          this.userForm.value.promotionId != null
            ? this.userForm.value.promotionId
            : this.data.user.promotionId,
        roleId: this.userForm.value.roleId,
        createdAt: this.data.user.createdAt,
        updatedAt: new Date(),
        Token:''
      };

      this.userService
        .put(this.data.user.id, userUpdated)
        .subscribe((user) => {
          this.openSnackBar('Utilisateur Modifier avec succes');
          this.onNoClick();
        });
    }
    this.userForm.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 2000,
    });
  }
}

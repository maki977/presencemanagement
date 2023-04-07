import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {  inject ,OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit  {
  login!: FormGroup;

  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {

    this.initFormControl();

    this.initFormGroup();
  }
  initFormGroup() {
    this.login = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });}

  initFormControl() {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]);

  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Veuillez saisir au moins 3 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Trop long';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
  onSubmit() {

    if (this.login.valid) {
      const { email, password } = this.login.value;
      this.authService.login(email, password).subscribe(() => this.router.navigate(['./admin/dashboard']));
    }
}
logout()
{

}
}

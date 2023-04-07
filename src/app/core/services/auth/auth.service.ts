import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

export interface Auth {
  token: Token;
}

export interface Token {
  token: string;
  user: User;
}

export interface User1 {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44306/api/AuthPerson/';
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  login(email: string, password: string): Observable<Auth> {
    const url = `${this.apiUrl}`;
    const credentials = { email, password };
    return this.http
      .post<Auth>(url, credentials)
      .pipe(tap((user) => this.setSession(user)));
  }

  private setSession(user: Auth) {
    localStorage.setItem('token', user.token.token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}

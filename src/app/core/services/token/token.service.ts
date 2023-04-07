import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['admin']);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  clearTokenExpired(): void {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // getPayload() {
  //   let user: any = {
  //     id: 0,
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //   };

  //   let token = localStorage.getItem('token');

  //   if (token != null) {
  //     const decode: any = jwtDecode<any>(token);

  //     user.id = decode.id;
  //     user.lastName = decode.lastName;
  //     user.firstName = decode.firstName;
  //     user.email = decode.email;
  //   }

  //   return user;
  // }
}

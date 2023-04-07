import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

export interface Student {
  promotionId: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userStatus: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = 'https://localhost:7262/api';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/Student`);
  }
}

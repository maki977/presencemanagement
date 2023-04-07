import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../../models/Classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseSchoolService {

  constructor(private http : HttpClient ) { }
  getAll(): Observable<Classe[]> {
  return this.http.get<Classe[]>('https://localhost:44306/api/Classroom/GetAll');
  }
  Create(classe : Classe): Observable<Classe> {
    return this.http.post<Classe>('https://localhost:44306/api/Classroom/Post',classe)}

  Put(id:number, classe : Classe): Observable<Classe> {
    return this.http.put<Classe>(`https://localhost:44306/api/Classroom/Put?id=${id}`,classe)}

   Delete(id:number): Observable<Classe> {
    return this.http.delete<Classe>(`https://localhost:44306/api/Classroom/Delete?id=${id}`)
   }

  }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdd } from 'src/app/features/admin/users/components/user-form/user-form.component';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    console.log("dddddddd: "+ httpOptions);

    return this.http.get<User[]>("https://localhost:44306/api/Person/GetAll", httpOptions);
  }

  post(credentials: User): Observable<User> {
    return this.http.post<User>("https://localhost:44306/api/Person/Post", credentials);
  }

  put(id: string | undefined, changes: User): Observable<User> {
    console.log(id);
    const idInt = Number(id);

    return this.http.put<User>(`https://localhost:44306/api/Person/Put?id=${id}`, changes);
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(`https://localhost:44306/api/Person/Delete?id=${id}`);
  }
}

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Matter {
  id?: number;
  name: string;


}

@Injectable({
  providedIn: 'root',
})
export class MatterService {

  constructor(private http: HttpClient) {}

  getMatters(): Observable<Matter[]> {
    return this.http.get<Matter[]>(`https://localhost:44306/api/Module/GetAll`);
  }
  CreateMatter(data:Matter): Observable<Matter> {
    return this.http.post<Matter>(`https://localhost:44306/api/Module/Post`,data);}

  UpdateMatter(id: number,data:Matter): Observable<Matter> {
    return this.http.put<Matter>(`https://localhost:44306/api/Module/Put?Id=${id}`,data);

}
 DeleteMatter(id:string,): Observable<Matter> {
    return this.http.delete<Matter>(`https://localhost:44306/api/Module/Delete?id=${id}`);
 }

}

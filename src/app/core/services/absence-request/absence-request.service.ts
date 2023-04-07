import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AbsenceRequest {
  id?: string;
  object: string;
  startTime: string;
  endTime: string;
  message: string;
  status: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
  nameStudent:string
}

@Injectable({
  providedIn: 'root',
})
export class AbsenceRequestService {


  constructor(private http: HttpClient) {}

  getAbsenceRequests(): Observable<AbsenceRequest[]> {
    return this.http.get<AbsenceRequest[]>(`https://localhost:44306/api/AbsenceRequest/GetAll`);
  }

  getAbsenceRequest(id: string): Observable<AbsenceRequest> {
    return this.http.get<AbsenceRequest>(``

    );
  }

  addAbsenceRequest(credentials: AbsenceRequest): Observable<AbsenceRequest> {
    return this.http.post<AbsenceRequest>(
     "https://localhost:44306/api/AbsenceRequest/Post",credentials
    );
  }

  updateAbsenceRequest(id: string  | undefined, changes: AbsenceRequest): Observable<AbsenceRequest> {
    return this.http.put<AbsenceRequest>(`https://localhost:44306/api/AbsenceRequest/Put?Id=${id}`, changes);
  }
}

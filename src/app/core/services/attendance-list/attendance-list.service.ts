import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresenceCallList } from '../../models/callData.model';

export let callData: PresenceCallList[] = [
  {
    id: '1',
    start: '8',
    end: '10',
    matterId: 'rrrf38f0af9-e186-4419-8505-6949584878da',
    promotionId: '7427438e-c8ae-421c-95f1-a048351861d4',
    createdAt: new Date(),
    presenceList: [
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: false,
      },
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: true,
      },
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: true,
      },
    ],
  },
  {
    id: '2',
    start: '8',
    end: '10',
    matterId: 'f38f0af9-e186-4419-8505-6949584878da',
    promotionId: '7427438e-c8ae-421c-95f1-a048351861d4',
    createdAt: new Date(),
    presenceList: [
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: false,
      },
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: true,
      },
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: true,
      },
    ],
  },

  {
    id: '2',
    start: '8',
    end: '10',
    matterId: 'f38f0af9-e186-4419-8505-6949584878da',
    promotionId: '7427438e-c8ae-421c-95f1-a048351861d4',
    createdAt: new Date(),
    presenceList: [
      {
        firstName: 'Chabehou',
        lastName: 'G',
        email: 's@gmail.com',
        isPresent: false,
      },
      {
        firstName: 'Mamam',
        lastName: 'Gossegdgd',
        email: 'si@gmail.com',
        isPresent: true,
      },
      {
        firstName: 'Makissi',
        lastName: 'Gosse',
        email: 'makissi@gmail.com',
        isPresent: false,
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class AttendanceListService {
  baseUrl = 'https://localhost:7262/api';

  constructor(private http: HttpClient) {}

  getPresenceCallLists(): Observable<PresenceCallList[]> {
    return this.http.get<PresenceCallList[]>(`${this.baseUrl}/AbsenceRequest`);
  }

  getPresenceCallLists1(id: string): PresenceCallList {
    return callData.filter((item) => item.id === id)[0];
  }
}

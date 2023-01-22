import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) { }

  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>('http://localhost:3000/rxp/prescriptions')
  }

  getPrescription(id: string): Observable<Prescription> {
    return this.http.get<Prescription>(`http://localhost:3000/rxp/prescriptions/${id}`)
  }

  getMyList(id: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`http://localhost:3000/rxp/prescriptions/mylist/${id}`)
  }

  addPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`http://localhost:3000/rxp/prescriptions/new`, prescription)
  }

  deletePrscription(id: string) {
    return this.http.delete(`http://localhost:3000/rxp/prescriptions/${id}`)
  }

}

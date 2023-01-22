import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from '../models/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  constructor(private http: HttpClient) { }

  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>('http://localhost:3000/rxp/drugs')
  }

  getDrug(drug_id: string): Observable<Drug> {
    return this.http.get<Drug>(`http://localhost:3000/rxp/drugs/${drug_id}`)
  }

  createDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>('http://localhost:3000/rxp/drugs/new/drug', drug)
  }

  updateDrug(drug: Drug): Observable<Drug> {
    return this.http.put<Drug>(`http://localhost:3000/rxp/drugs/update/${drug._id}`, drug)
  }

  deleteDrug(drug_id: string): Observable<Drug> {
    return this.http.delete<Drug>(`http://localhost:3000/rxp/drugs/delete/${drug_id}`)
  }
}

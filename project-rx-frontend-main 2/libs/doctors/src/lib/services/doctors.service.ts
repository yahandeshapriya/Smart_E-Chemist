import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor'

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http: HttpClient) { }

  getDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>('http://localhost:3000/rxp/doctors')
  }

  getDoctor(id: string) : Observable<Doctor> {
    return this.http.get<Doctor>(`http://localhost:3000/rxp/doctors/get/${id}`)
  }

  createDoctor(doctor: FormData) : Observable<FormData> {
    return this.http.post<FormData>('http://localhost:3000/rxp/doctors/register', doctor)
  }

  login(username: string, passwaord: string): Observable<Doctor> {
    return this.http.post<Doctor>('http://localhost:3000/rxp/doctors/login', 
    {username: username, passwordHash: passwaord})
  }

  deleteDoctor(id: string): Observable<Doctor> {
    return this.http.delete<Doctor>(`http://localhost:3000/rxp/doctors/delete/${id}`)
  }

  verifyUser(id: string, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`http://localhost:3000/rxp/doctors/profileverify/${id}`, doctor)
  }

}

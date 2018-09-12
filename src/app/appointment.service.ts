import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';
import { Appointment } from './appointment';

//Only accept JSON data from the API
const recvOptions = {
  headers: new HttpHeaders({"Accept": "application/json"})
};

//Inform the API that we are sending JSON and would like to receive JSON in response
const  sendOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "http://devtechtest.previewourapp.com/api";
  private emailParam: string = "providerEmail=andretuparamorrison@gmail.com";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/User?${this.emailParam}`,
      recvOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/User/${id}?${this.emailParam}`, 
      recvOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.apiUrl}/Appointment?${this.emailParam}`, 
      recvOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(
      `${this.apiUrl}/Appointment/${id}?${this.emailParam}`,
      recvOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  createAppointment(appt: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(
      `${this.apiUrl}/Appointment?${this.emailParam}`,
      appt,
      sendOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  updateAppointment(appt: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(
      `${this.apiUrl}/Appointment/${appt.id}?${this.emailParam}`,
      appt,
      sendOptions
    )
  }

  deleteAppointment(appt: Appointment): Observable<Appointment> {
    return this.http.delete<Appointment>(
      `${this.apiUrl}/Appointment/${appt.id}?${this.emailParam}`,
      recvOptions
    )
  }

  private handleError() {
    return throwError('Unable to connect to appointment database, please try again later.');
  }
}

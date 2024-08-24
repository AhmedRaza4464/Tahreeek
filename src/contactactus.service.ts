import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

interface ContactUs {
  id?: number;
  name: string;
  districtLevel: string;
  ps: string;
  uc: string;
  na: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private apiUrl = 'https://localhost:7235/api/ContactUs'; // Backend API URL

  constructor(private http: HttpClient) {}

  getContacts(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createContact(contact: ContactUs): Observable<ContactUs> {
    return this.http.post<ContactUs>(this.apiUrl, contact)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
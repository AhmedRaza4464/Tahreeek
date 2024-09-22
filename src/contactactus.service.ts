import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  apiUrl = 'https://localhost:7001/api/ContactUs'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all contacts
  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single contact by ID
  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new contact
  createContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing contact
  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contact).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a contact
  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}

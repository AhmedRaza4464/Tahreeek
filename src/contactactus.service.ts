import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  apiUrl = 'https://localhost:7126/api/ContactUs'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all contacts
  // getContacts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Create a new contact
  createContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl,contact)
      
  }

  // Update an existing contact
  // updateContact(id: number, contact: any): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, contact).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Delete a contact
  // deleteContact(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Error handling
  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side or network error
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // Backend error
  //     console.error(`Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return a user-facing error message
  //   return throwError('Something went wrong; please try again later.');
  // }
}

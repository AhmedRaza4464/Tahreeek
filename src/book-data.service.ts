import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  apiUrl: any;

  constructor(private http: HttpClient) {}
  // Dummy book data for example purposes, you can replace this with an API call
  private books = [
    { number: 415120101, label: 'Book 1', pdfUrl: 'assets/pdf94/415120101.pdf' },
    { number: 415120102, label: 'Book 2', pdfUrl: 'assets/pdf94/415120102.pdf' },
    { number: 415120103, label: 'Book 3', pdfUrl: 'assets/pdf94/415120103.pdf' },
    // Add more books as needed...
  ];


  // Function to get book data
  getBooks(): Observable<{ number: number, label: string, pdfUrl: string }[]> {
    // You can replace this 'of' with an actual API call like HttpClient
    return of(this.books);
  }

  // Optionally, get a specific book's data
  getBookData(bookNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookNumber}`);
  }
}

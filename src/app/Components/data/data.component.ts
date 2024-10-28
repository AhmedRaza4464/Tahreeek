import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BookDataService } from 'src/book-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  pdfSrc: string = 'assets/pdf94/415120101.pdf';

  constructor(private bookDataService: BookDataService) {}


  options: { ps: string; value: string }[] = [];
  books: { number: number; label: string; pdfUrl: string }[] = [];
  filteredBooks: { number: number; label: string; pdfUrl: string }[] = [];
  tableData: { ps: string | null; booknumber: number; name: string; phonenumber: number; identitycard: number; address: string; house: string; pdfUrl: string }[] = [];
  searchQuery: string = '';
  searchTerm: string = '';
  selectedOption: string | null = null;
  selectedBook: number | null = null;
  names: string[] = ['Person'];  // Add default names

  ngOnInit() {
    // Generate options from PS-92 to PS-98
    for (let i = 92; i <= 98; i++) {
      this.options.push({ ps: `PS-${i}`, value: `PS-${i}` });
    }
  }

  onOptionChange(value: string): void {
    this.selectedOption = value;

    // Clear existing data
    this.books = [];
    this.tableData = [];
    this.selectedBook = null;
    this.searchQuery = '';

    // Load books for PS-94
    if (value === 'PS-94') {
      for (let i = 415120101; i <= 415120908; i++) {
        this.books.push({
          number: i,
          label: `Book ${i}`,
          pdfUrl: `assets/pdf94/${i}.pdf`  // Ensure this path is correct
        });
      }
    }

    this.filteredBooks = [...this.books];  // Copy books to filteredBooks
  }

  onBookChange(bookNumber: number): void {
    this.selectedBook = bookNumber;
  
    // Fetch book data from the service
    this.bookDataService.getBookData(bookNumber).subscribe((realData) => {
      console.log('Fetched data:', realData);  // Log fetched data for debugging
  
      if (realData) {
        // Map the real data to the table structure
        this.tableData = realData.map((data: any) => ({
          ps: this.selectedOption,
          booknumber: data.number,          
          name: data.name,                  
          phonenumber: data.phonenumber,    
          identitycard: data.identitycard,  
          address: data.address,            
          house: data.house,                
          pdfUrl: data.pdfUrl               
        }));
      } else {
        console.error('No data returned for this book number');
      }
    }, (error) => {
      console.error('Error fetching data:', error);
    });
  }
  

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.number.toString().includes(this.searchQuery) ||
      book.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filteredTableData(): any[] {
    if (!this.searchTerm) {
      return this.tableData;
    }
  
    const searchTermLower = this.searchTerm.toLowerCase();
  
    return this.tableData.filter(data =>
      data.booknumber.toString().includes(searchTermLower) ||
      data.name.toLowerCase().includes(searchTermLower) ||
      data.phonenumber.toString().includes(searchTermLower) ||
      data.identitycard.toString().includes(searchTermLower) ||
      data.address.toLowerCase().includes(searchTermLower) ||
      data.house.toLowerCase().includes(searchTermLower)
    );
  }
  

  onRowClick(data: any): void {
    console.log('Row clicked:', data);
  }

  showBookData(book: any): void {
    this.onBookChange(book.number);
  }

  // Download PDF
  downloadpdf(): void {
    const doc = new jsPDF();
    autoTable(doc, { html: "#test", theme: 'grid' });
    doc.save("testpdf.pdf");
  }

  // Download Excel
  downloadexcel(): void {
    const table = document.getElementById('test');
    if (table) {
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'test.xlsx');
    }
  }
}

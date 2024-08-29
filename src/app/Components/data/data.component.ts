import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  options: { ps: string; value: string }[] = [];
  books: { number: number; label: string; pdfUrl: string }[] = [];
  filteredBooks: { number: number; label: string; pdfUrl: string }[] = [];
  tableData: { ps: string | null; booknumber: number; name: string; phonenumber: number; identitycard: number; address: string; house: string; pdfUrl: string }[] = [];
  searchQuery: string = '';
  searchTerm: string = '';
  selectedOption: string | null = null;
  selectedBook: number | null = null;

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

    if (value === 'PS-94') {
      for (let i = 415120101; i <= 415120908; i++) {
        this.books.push({ number: i, label: `Book ${i}`, pdfUrl: `path-to-pdf${i}.pdf` });
      }
    }

    this.filteredBooks = [...this.books];
  }


  onBookChange(bookNumber: number): void {
    this.selectedBook = bookNumber;

    // Generate sample data based on selected book number
    this.tableData = Array.from({ length: 3 }, (_, index) => ({
      ps: this.selectedOption,  // Store the selected PS option
      booknumber: bookNumber,
      name: `Ahmed Raza ${index + 1}`,
      phonenumber: 3000000000 + index,
      identitycard: 1000000000 + index,
      address: `Address ${index + 1}`,
      house: `House #${index + 1}`,
      pdfUrl: `path-to-pdf${bookNumber}.pdf`  // Dynamically assign PDF URL for each book number
    }));
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

  showBookData(book: any): void {
    this.onBookChange(book.number);
  }


  downloadpdf(){
    var doc = new jsPDF();
    autoTable(doc,{html:"#test",theme:'grid'});
    doc.save("testpdf");
  }


}

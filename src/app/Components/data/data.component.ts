import { Component } from '@angular/core';

interface Book {
  number: number;
  label: string;
  url: string;
}


interface TableData {
  ps: number;
  booknumber: number;
  name: string;
  phonenumber: number;
  identitycard: number;
  address: string;
  house: string;
}


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  options: { ps: string; value: string }[] = [];
  books: { number: number; label: string }[] = [];
  selectedOption: string | null = null;
  selectedBook: Book | null = null;
  tableData: TableData[] = [];
  bookData: { number: number; details: string; }[] = [];
  searchQuery: string = '';
  filteredBooks: Book[] = [];
  searchTerm: string ='';
  


ps94Books: Book[] = [
  { number: 415120101, label: 'Book 415120101', url: 'assets/pdf/415120101.pdf' },
  { number: 415120102, label: 'Book 415120102', url: 'assets/pdf/415120102.pdf' },
  // Add more books here...
];


  ngOnInit() {
    // Generate options from PS-92 to PS-98
    for (let i = 92; i <= 98; i++) {
      this.options.push({ ps: `PS-${i}`, value: `PS-${i}` });
    }
  }

  onOptionChange(value: string): void {
    this.selectedOption = value;
    const numberValue = parseInt(value.replace('PS-', ''), 10);

    // Clear existing data
    this.tableData = [];
    this.bookData = [];
    this.books = [];

    if (value === 'PS-94') {
      for (let i = 415120101; i <= 415120908; i++) {
        this.books.push({ number: i, label: `Book ${i}` });
      }
    }
  }

  // onBookChange(value: number): void {
  //   this.selectedBook = value;

  //   // Generate book data based on selected book number
  //   this.tableData = Array.from({ length: 3 }, (_, index) => ({
  //     ps: 94,
  //     booknumber: value,
  //     name: `Person ${index + 1}`,
  //     phonenumber: 3000000000 + index,
  //     identitycard: 1000000000 + index,
  //     address: `Address ${index + 1}`,
  //     house: `House #${index + 1}`
  //   }));
  // }


  onBookChange(bookNumber: number): void {
    // Find the selected book from the list
    this.selectedBook = this.ps94Books.find((book: Book) => book.number === bookNumber) || null;
  
    if (this.selectedBook) {
      // Generate sample data based on selected book number
      this.tableData = Array.from({ length: 3 }, (_, index) => ({
        ps: 94,
        booknumber: bookNumber,  // Use the selected book number
        name: `Person ${index + 1}`,
        phonenumber: 3000000000 + index,
        identitycard: 1000000000 + index,
        address: `Address ${index + 1}`,
        house: `House #${index + 1}`
      }));
    }
  }
  // filterBooks() {
  //   this.filteredBooks = this.books.filter(book =>
  //     book.number.toString().includes(this.searchTerm) ||
  //     book.label.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  filteredTableData() {
    if (!this.searchTerm) {
      return this.tableData;
    }
    return this.tableData.filter(data => 
      data.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      data.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      data.house.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

// filter  //  


///Show Book Data//

showBookData(book: Book): void {
  // Set the selected book and display its details
  this.onBookChange(book.number);

  // Now open the PDF in a new tab
  window.open(book.url, '_blank');
}

///Show Book Data//
  
}

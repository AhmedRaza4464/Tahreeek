import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  options: { ps: string; value: string }[] = [];
  books: { number: number; label: string }[] = [];
  selectedOption: string | null = null;
  selectedBook: number | null = null;
  tableData: { ps: number; name: string; phonenumber: number; identitycard: number; address: string; house: string; }[] = [];
  bookData: { number: number; details: string; }[] = [];

  ngOnInit() {
    // Generate options from PS-92 to PS-98
    for (let i = 92; i <= 98; i++) {
      this.options.push({ ps: `PS-${i}`, value: `PS-${i}` });
    }
  }

  onOptionChange(value: string): void {
    this.selectedOption = value;
    
    // Clear existing data
    this.tableData = [];
    this.bookData = [];
    
    // Agar PS-94 selected hai tou specific book numbers dikhayein
    if (value === 'PS-94') {
        this.books = [];
        for (let i = 415120101; i <= 415120908; i++) {
            this.books.push({ number: i, label: `Book ${i}` });
        }
    } else {
        // Kisi aur PS per koi books show nahi hogi
        this.books = [];
    }
}


  onBookChange(value: number): void {
    this.selectedBook = value;

    // Generate sample data based on selected book number
    this.tableData = Array.from({ length: 12 }, (_, index) => {
      const rowNumber = value + index;
      return {
        ps: value,
        name: `Person ${rowNumber}`,
        phonenumber: 3000000000 + rowNumber,
        identitycard: 1000000000 + rowNumber,
        address: `Address ${rowNumber}`,
        house: `House #${rowNumber}`
      };
    });

    // Generate sample book details data
    this.bookData = [
      { number: value, details: `Details of Book ${value} - Part 1` },
      { number: value, details: `Details of Book ${value} - Part 2` },
      { number: value, details: `Details of Book ${value} - Part 3` }
    ];
  }
}

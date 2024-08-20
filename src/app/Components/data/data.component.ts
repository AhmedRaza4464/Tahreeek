import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  options: { ps: string; value: string }[] = [];
  selectedOption: string | null = null;
  tableData: { ps:number;name: string; phonenumber: number; identitycard: number; address: string; house: string; }[] = [];

  ngOnInit() {
    // Generate options from PS-94 to PS-125
    for (let i = 94; i <= 125; i++) {
      this.options.push({ ps: `PS-${i}`, value: `PS-${i}` });
    }
  }

  onOptionChange(value: string): void {
    this.selectedOption = value;
    const numberValue = parseInt(value.replace('PS-', ''), 10);
  
    // Generate sample data based on selected option
    this.tableData = Array.from({ length: 12 }, (_, index) => {
      const rowNumber = numberValue + index; // Generate unique number for each row
      return {
        ps: numberValue, // Assuming `ps` should be a number
        name: `Person ${rowNumber}`, // Set a sample name for each entry
        phonenumber: 3000000000 + rowNumber, // Example phone number
        identitycard: 1000000000 + rowNumber, // Example identity card number
        address: `Address ${rowNumber}`, // Example address
        house: `House #${rowNumber}` // Example house number
      };
    });
  
    // Log data to debug
    console.log('Selected Option:', this.selectedOption);
    console.log('Table Data:', this.tableData);
  }
}
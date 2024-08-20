import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
  // cards = [
  //   {
  //     image: 'assets/sample-image1.jpg',
  //     altText: 'Card Image 1',
  //     title: 'Card Title 1',
  //     name: 'John Doe',
  //     fatherName: 'Father Name',
  //     identityCard: '12345-6789012-3',
  //     phoneNumber: '0123456789',
  //     address: '123 Street, City, Country',
  //     totalAfraad: 5,
  //     lastUpdated: '3 mins ago'
  //   }
  //   // Add more cards as needed
  // ];

  // addCard() {
  //   this.cards.push({
  //     image: 'assets/sample-image2.jpg', // Adjust the image path accordingly
  //     altText: 'New Card Image',
  //     title: 'New Card Title',
  //     name: 'New Name',
  //     fatherName: 'New Father Name',
  //     identityCard: 'New Identity Card',
  //     phoneNumber: 'New Phone Number',
  //     address: 'New Address',
  //     totalAfraad: 3,
  //     lastUpdated: 'Just now'
  //   });
  // }

  cards = [
    { title: 'Card Title 1', text: 'This is a wider card with supporting text.', image: 'path-to-image1', altText: 'Image 1', lastUpdated: '3 mins ago' },
    { title: 'Card Title 2', text: 'This is a wider card with supporting text.', image: 'path-to-image2', altText: 'Image 2', lastUpdated: '5 mins ago' }
  ];

  isEditing = false;
  isAdding = false;
  currentCard = { title: '', text: '', image: '', altText: '', lastUpdated: '' };
  editingIndex: number | null = null;

  addCard() {
    this.isAdding = true;
    this.isEditing = false;
    this.currentCard = { title: '', text: '', image: '', altText: '', lastUpdated: 'Just now' };
  }

  editCard(index: number) {
    this.isEditing = true;
    this.isAdding = false;
    this.editingIndex = index;
    this.currentCard = { ...this.cards[index] };
  }

  deleteCard(index: number) {
    this.cards.splice(index, 1);
  }

  saveCard() {
    if (this.isEditing && this.editingIndex !== null) {
      this.cards[this.editingIndex] = { ...this.currentCard };
    } else {
      this.cards.push({ ...this.currentCard });
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.isEditing = false;
    this.isAdding = false;
    this.currentCard = { title: '', text: '', image: '', altText: '', lastUpdated: '' };
  }


}

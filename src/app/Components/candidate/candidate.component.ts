import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
  // Initial cards with biodata
  cards = [
    {
      name: 'John Doe',
      district: 'District 1',
      area: 'Area 1',
      uc: 'UC 1',
      na: 'NA 1',
      image: 'assets/sample-image1.jpg',
      altText: 'Image 1',
      lastUpdated: '3 mins ago'
    },
    {
      name: 'Jane Doe',
      district: 'District 2',
      area: 'Area 2',
      uc: 'UC 2',
      na: 'NA 2',
      image: 'assets/sample-image2.jpg',
      altText: 'Image 2',
      lastUpdated: '5 mins ago'
    }
  ];

  isEditing = false;
  editingIndex: number | null = null;

  // Model for the card being edited or added
  currentCard = {
    name: '',
    district: '',
    area: '',
    uc: '',
    na: '',
    image: '',
    altText: '',
    lastUpdated: ''
  };

  // Add a new card
  addCard() {
    this.isEditing = false;
    this.currentCard = {
      name: '',
      district: '',
      area: '',
      uc: '',
      na: '',
      image: '',
      altText: '',
      lastUpdated: 'Just now'
    };
    this.openModal();
  }

  // Edit an existing card
  editCard(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    this.currentCard = { ...this.cards[index] }; // Copy the card data to the form
    this.openModal();
  }

  // Open the modal
  openModal() {
    const modalElement = document.getElementById('cardModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
  }
  

  // Delete a card
  deleteCard(index: number) {
    this.cards.splice(index, 1);
  }

  // Save the card (either add a new card or update an existing one)
  saveCard() {
    if (this.isEditing && this.editingIndex !== null) {
      this.cards[this.editingIndex] = { ...this.currentCard }; // Update the card
    } else {
      this.cards.push({ ...this.currentCard }); // Add a new card
    }
    this.cancelEdit();
  }

  // Cancel editing or adding a card
  cancelEdit() {
    this.currentCard = {
      name: '',
      district: '',
      area: '',
      uc: '',
      na: '',
      image: '',
      altText: '',
      lastUpdated: ''
    };
  }
}

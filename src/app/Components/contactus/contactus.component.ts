import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from 'src/contactactus.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm!: FormGroup;
  contacts: any[] = [];
  selectedContact: any = null;
  isSubmitting = false;


  constructor(private fb: FormBuilder, private contactUsService: ContactUsService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      district: ['', Validators.required],
      ps: ['', Validators.required],
      uc: ['', Validators.required],
      na: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Load all contacts on component initialization
    this.loadContacts();
  }

  // Load all contacts
  loadContacts(): void {
    this.contactUsService.getContacts().subscribe(
      data => {
        this.contacts = data;
      },
      error => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  // Submit a new or updated contact
  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
  
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000); // Add a debounce of 1 second to prevent multiple submissions
  
      if (this.selectedContact) {
        this.updateContact(this.selectedContact.id, this.contactForm.value);
      } else {
        this.createContact();
      }
    }
  }
  

  // Create a new contact
  createContact(): void {
    this.contactUsService.createContact(this.contactForm.value).subscribe(
      response => {
        console.log('Contact saved successfully', response);
        this.contactForm.reset();
        this.loadContacts(); // Reload contacts after creation
      },
      error => {
        console.error('Error saving contact', error);
      }
    );
  }

  // Update an existing contact
  updateContact(id: number, contactData: any): void {
    this.contactUsService.updateContact(id, contactData).subscribe(
      response => {
        console.log('Contact updated successfully', response);
        this.contactForm.reset();
        this.selectedContact = null; // Clear selected contact
        this.loadContacts(); // Reload contacts after update
      },
      error => {
        console.error('Error updating contact', error);
      }
    );
  }

  // Delete a contact
  deleteContact(id: number): void {
    this.contactUsService.deleteContact(id).subscribe(
      () => {
        console.log('Contact deleted successfully');
        this.loadContacts(); // Reload contacts after deletion
      },
      error => {
        console.error('Error deleting contact', error);
      }
    );
  }

  // Edit a contact
  editContact(contact: any): void {
    this.selectedContact = contact;
    this.contactForm.patchValue(contact);
  }

  // Cancel edit
  cancelEdit(): void {
    this.selectedContact = null;
    this.contactForm.reset();
  }
}

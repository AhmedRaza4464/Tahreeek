import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContactUsService } from 'src/contactactus.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactUsService: ContactUsService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [''],
      district: [''],
      ps: [''],
      uc: [''],
      na: [''],
      message: [''],    });
  }

  onSubmit(): void {
      this.contactUsService.createContact(this.contactForm.value).subscribe(
        response => {
          console.log('Contact saved successfully', response);
          // Optionally, reset the form or show a success message
          this.contactForm.reset();
        },
        error => {
          console.error('Error saving contact', error);
          // Optionally, show an error message
        }
      );
    } 
  }
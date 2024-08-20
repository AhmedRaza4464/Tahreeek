import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contact = {
    name: '',
    district: '',
    ps: '',
    uc: '',
    na: '',
    message: ''
  };

  private apiUrl = 'http://localhost:3000/contacts'; // JSON Server URL

  constructor(private http: HttpClient, private message: NzMessageService) {}

  onSubmit(): void {
    this.http.post(this.apiUrl, this.contact).subscribe({
      next: () => {
        this.createMessage('success');
        this.resetForm();
      },
      error: () => this.createMessage('error')
    });
  }

  resetForm(): void {
    this.contact = {
      name: '',
      district: '',
      ps: '',
      uc: '',
      na: '',
      message: ''
    };
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

}

import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  
  @ViewChild('okAlert') private okAlert!: ElementRef;
  @ViewChild('errorAlert') private errorAlert!: ElementRef;
  
  username: string = '';
  showModal: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';

  constructor(
    private userService: UserService,
    private renderer: Renderer2
  ) { }

  openModal() {
    this.showModal = true;
    this.username = localStorage.getItem('username') ?? '';
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    
    this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'none');

    if (this.currentPassword && this.newPassword) {
      this.userService.updatePassword(this.username, this.currentPassword, this.newPassword).subscribe(
        (response) => {
          this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'block');
          setTimeout(() => {
            this.closeModal();
          }, 1500);
        },
        (error) => {
          this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'block');
        }
      );
    }
  }
}


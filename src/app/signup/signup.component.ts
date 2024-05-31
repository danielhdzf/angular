import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @ViewChild('errorAlert') private errorAlert!: ElementRef;
  @ViewChild('okAlert') private okAlert!: ElementRef;
  
  signupform = new FormGroup({
    username : new FormControl('', [Validators.maxLength(8),Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  });

  constructor(
    private signupService: SignupService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  dosignup(data: FormGroup) {

    const { username, password, email } = this.signupform.value;

    this.signupService.registerUser(username!, password!, email!).subscribe(
      () => {
        this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'block');
        setTimeout(() => {
          
          this.router.navigate(['/login']);
        }, 1500);
      },
      (error) => {
        if (error.status === 409) {
          this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'block');
        }
      }
    );
  }

}

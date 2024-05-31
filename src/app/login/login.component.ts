import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('okAlert') private okAlert!: ElementRef;
  @ViewChild('errorAlert') private errorAlert!: ElementRef;

  loginform = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginService, 
    private renderer: Renderer2,
    private router: Router
    ) {}

  dologin(data: FormGroup) {

    this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'none');

    const { username, password } = this.loginform.value;

    this.loginService.login(username!, password!).subscribe(
      (response) => {
        this.loginService.setLoggedIn(true);
        localStorage.setItem('username', username!);
        this.loginService.saveToken(response.body);
        this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'block');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      (error) => {
        console.error('Login error:', error);
        if (error) {
          this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'block');
        }
      }
    );
  }
}

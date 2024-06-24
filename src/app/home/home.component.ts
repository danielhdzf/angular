import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router: Router
  ) { }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToReactionTime() {
    this.router.navigate(['/reaction-time']);
  }

  navigateToSimonSays() {
    this.router.navigate(['/simon']);
  }

  navigateToNumberSequence() {
    this.router.navigate(['/number-sequence']);
  }

  navigateToColorAim() {
    this.router.navigate(['/color-aim']);
  }


}

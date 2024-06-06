import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected isLoggedIn: boolean = false;

  constructor( public loginService: LoginService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.loginService.getAuthToken();
    this.loginService.getLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    console.log('isLoggedIn', this.isLoggedIn);
  }

  logout() {
    this.loginService.setLoggedIn(false);
    this.loginService.clearToken();
  }
}

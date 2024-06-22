import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, RouterModule, UpdatePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @ViewChild('updatePasswordModal') updatePasswordModal!: UpdatePasswordComponent;

  username: string = '';
  email: string = '';

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';
    this.userService.getUser(this.username).subscribe(
      (data: any) => {
        this.email = data.email;
      },
    );
  }

  logout() {
    this.loginService.setLoggedIn(false);
    this.loginService.clearToken();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  openUpdatePasswordModal() {
    this.updatePasswordModal.openModal();
  }
}

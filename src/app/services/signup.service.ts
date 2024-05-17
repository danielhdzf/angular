import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {

  private apiUrl = "http://localhost:8080/users/signup"

  constructor(private http: HttpClient) {}

  registerUser(username: string, email: string, password: string): Observable<any> {
    const url = this.apiUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, email, password };

    return this.http.post(url, body, { headers });
  }

}

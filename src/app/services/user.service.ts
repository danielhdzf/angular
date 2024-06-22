import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get(url, { responseType: 'json' });
  }

  updatePassword(username: string, password: string, new_password: string): Observable<any> {
    const url = `${this.apiUrl}/updatePassword?username=${username}&password=${password}&new_password=${new_password}`;
    return this.http.put(url, { responseType: 'json' });
}
}

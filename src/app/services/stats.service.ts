import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = 'http://localhost:8080/stats';
  constructor(private http: HttpClient) { }

  getTop5Scores(username: string, game: string) : Observable<any>{
    if(game === 'reactionTime' || game === 'colorAim') {
      return this.http.get(`${this.apiUrl}/top5_time?username=${username}&game=${game}`);
    } else if(game === 'simonSays' || game === 'numberSequence') {
      return this.http.get(`${this.apiUrl}/top5_level?username=${username}&game=${game}`);
    } else {
      return Object.create(null);
    }
  }

  getAverageScore(username: string, game: string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/average?username=${username}&game=${game}`);
  }
}

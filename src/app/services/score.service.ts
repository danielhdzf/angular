import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiUrl = 'http://localhost:8080/scores';
  constructor(private http: HttpClient) { }

  saveScore(username: string, score: number, game: string) {
    const url = this.apiUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, score, game };
    return this.http.post(url, body, { headers});
  }

  getTop5Scores(game: string) : Observable<any>{
    if(game === 'reactionTime') {
      return this.http.get(`${this.apiUrl}/top5_time?game=${game}`);
    } else if(game === 'simonSays' || game === 'numberSequence') {
      return this.http.get(`${this.apiUrl}/top5_level?game=${game}`);
    } else {
      return Object.create(null);
    }
  }
  
  getAverageScore(game: string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/average?game=${game}`);
  }
}

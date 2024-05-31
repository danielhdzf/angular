import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getTop5Scores(game: string) {
    if (game === 'reactionTime')
      return this.http.get(`${this.apiUrl}/top5_time`);
    else if (game === 'memory')
      return this.http.get(`${this.apiUrl}/top5_level`);
    else
      return;
  }

  getAverageScore(game: string) {
    return this.http.get(`${this.apiUrl}/average`);
  }
}

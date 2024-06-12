import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit,} from '@angular/core';
import { ScoreService } from '../services/score.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit{

  private games: string[] = ['reactionTime', 'simonSays', 'numberSequence']
  protected globalTop5Scores: any[][] = [];
  protected globalAverageScore: number[] = [0,0];
  protected userTop5Scores: any[][] = [];
  protected userAverageScore: number[] = [0,0];
  protected globalStats: boolean = true;

  constructor(
    private scoreService: ScoreService,
    private statsService: StatsService,
  ) { }

  ngOnInit() {
    const username: string = localStorage.getItem('username')!;
    this.games.forEach((game, index) => {
      this.scoreService.getTop5Scores(game).subscribe(
        (response: any) => {
          if (response) {
            this.globalTop5Scores[index] = response;
          }
        }
      );

      this.scoreService.getAverageScore(game).subscribe(
        (response: any) => {
          if (response) {
            this.globalAverageScore[index] = parseFloat(response.toFixed(0));
          }
        }
      );

      this.statsService.getTop5Scores(username, game).subscribe(
        (response: any) => {
          if (response) {
            this.userTop5Scores[index] = response.scores;
          }
        }
      );

      this.statsService.getAverageScore(username, game).subscribe(
        (response: any) => {
          if (response) {
            this.userAverageScore[index] = parseFloat(response.toFixed(0));
          }
        }
      );
    });
  }

  changeStats() {
    this.globalStats = !this.globalStats;
  }
}

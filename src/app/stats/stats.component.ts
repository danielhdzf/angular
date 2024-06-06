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

  protected globalTop5Scores: any[] = [];
  protected globalAverageScore: number = 0;
  protected userTop5Scores: any[] = [];
  protected userAverageScore: number = 0;
  protected globalStats: boolean = true;

  constructor(
    private scoreService: ScoreService,
    private statsService: StatsService,
  ) { }

  ngOnInit() {
    const username: string = localStorage.getItem('username')!;
    this.scoreService.getTop5Scores('reactionTime').subscribe(
      (response: any) => {
      if (response) {
        this.globalTop5Scores = response;
      }
    });

    this.scoreService.getAverageScore('reactionTime').subscribe(
      (response: any) => {
      if (response) {
        this.globalAverageScore = response.toFixed(0);
      }
    });

    this.statsService.getTop5Scores(username, 'reactionTime').subscribe(
      (response: any) => {
      if (response) {
        this.userTop5Scores = response.scores;
      }
    });

    this.statsService.getAverageScore(username,'reactionTime').subscribe(
      (response: any) => {
      if (response) {
        this.userAverageScore = response.toFixed(0);
      }
    });
  }

  changeStats() {
    this.globalStats = !this.globalStats;
  }
}

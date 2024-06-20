import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit,} from '@angular/core';
import { ScoreService } from '../services/score.service';
import { StatsService } from '../services/stats.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit{

  games: string[] = ['reactionTime', 'simonSays', 'numberSequence', 'colorAim']
  globalTop5Scores: any[][] = [];
  globalAverageScore: number[] = [0,0];
  userTop5Scores: any[][] = [];
  userAverageScore: number[] = [0,0];
  selectedOption: string = 'global';

  constructor(
    private scoreService: ScoreService,
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const username: string = localStorage.getItem('username')!;

    if (this.route) {
      this.route.queryParams?.subscribe((params: Params) => {
        const view = params['view'];
        this.selectedOption = view === 'your-stats' ? 'your' : 'global';
      });
    }

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

  changeStats(option: string): void {
    this.selectedOption = option;
  }
}

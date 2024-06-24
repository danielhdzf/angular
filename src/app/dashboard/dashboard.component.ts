import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  games: string[] = ['reactionTime', 'simonSays', 'numberSequence', 'colorAim']
  userTop5Scores: any[][] = [];
  username: string = '';

  constructor(
    private statsService: StatsService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';

    this.games.forEach((game, index) => {
      this.statsService.getTop5Scores(this.username, game).subscribe(
        (response: any) => {
          if (response) {
            this.userTop5Scores[index] = response.scores;
          }
        }
      );
    });
    console.log(this.userTop5Scores[0][0].score)
  }

  logout() {
    this.loginService.setLoggedIn(false);
    this.loginService.clearToken();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  navigateToStats() {
    this.router.navigate(['/stats'], { queryParams: { view: 'your-stats' } });
  }

}

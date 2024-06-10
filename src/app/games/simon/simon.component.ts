import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-simon',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css'
})
export class SimonComponent {

  @ViewChild('startInfo') private startInfo!: ElementRef;
  @ViewChild('restartButton') private restartButton!: ElementRef;
  @ViewChild('saveButton') private saveButton!: ElementRef;
  @ViewChild('okAlert') private okAlert!: ElementRef;
  @ViewChild('errorAlert') private errorAlert!: ElementRef;
  
  colors = ['red', 'green', 'blue', 'yellow'];
  sequence: string[] = [];
  playerSequence: string[] = [];
  level: number = 0;
  message: string = '';
  gameStarted: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'none');
  }

  startGame() {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 0;
    this.message = 'Game Started!';
    this.gameStarted = true;
    this.nextRound();
  }

  nextRound() {
    this.level++;
    this.playerSequence = [];
    this.sequence.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
    this.showSequence();
  }

  showSequence() {
    let i = 0;
    const interval = setInterval(() => {
      this.highlightColor(this.sequence[i]);
      i++;
      if (i >= this.sequence.length) {
        clearInterval(interval);
      }
    }, 1000);
  }

  highlightColor(color: string) {
    const element = document.querySelector(`.${color}`);
    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 500);
    }
  }

  handleColorClick(color: string) {
    this.playerSequence.push(color);
    if (!this.checkSequence()) {
      this.message = 'Game Over! Level achive ' + (this.level - 1);
      this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'block');
      return;
    }
    if (this.playerSequence.length === this.sequence.length) {
      this.message = `Level ${this.level} complete!`;
      setTimeout(() => {
        this.nextRound();
      }, 1000);
    }
  }

  checkSequence(): boolean {
    for (let i = 0; i < this.playerSequence.length; i++) {
      if (this.playerSequence[i] !== this.sequence[i]) {
        return false;
      }
    }
    return true;
  }

  restartGame() {
    this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'none');
    this.gameStarted = false;
    this.message = '';
  }

  saveScore() {
    this.scoreService.saveScore(localStorage.getItem('username')!, this.level - 1, 'simonSays').subscribe(
      (response) => {
        this.renderer.setStyle(this.okAlert.nativeElement, 'display', 'block');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (error) => {
        this.renderer.setStyle(this.errorAlert.nativeElement, 'display', 'block');
      }
    );
  }
}


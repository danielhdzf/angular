import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reaction-time',
  standalone: true,
  imports: [],
  templateUrl: './reaction-time.component.html',
  styleUrl: './reaction-time.component.css'
})
export class ReactionTimeComponent {

  @ViewChild('gameArea') private gameArea!: ElementRef;

  MAX_ITERATIONS = 4;
  gameStarted = false;
  isGreen = false;
  isTooSoon = false;
  isGameOver = false;
  startTime!: number;
  timerId!: any;
  iterations!: number;
  score!: number;
  finalScore!: string;

  constructor() {
  }

  ngAfterViewInit() {
    this.gameArea.nativeElement.addEventListener('click', (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === 'restartButton') return;
      if (!this.gameStarted && !this.isGameOver) {
        this.startGame();
      } else if (this.isTooSoon) {
        this.resetGame();
      } else if (this.isGreen) {
        this.handleGreenClick();
      } else if (!this.isGreen && !this.isGameOver){
        this.handleRedClick();
      }
    });
  }

  startGame() {
    this.gameStarted = true;
    this.isGameOver = false;
    this.isGreen = false;
    this.isTooSoon = false;
    this.iterations = 0;
    this.score = 0;
    this.gameArea.nativeElement.style.backgroundColor = 'tomato';
    this.scheduleTurnGreen();
  }

  scheduleTurnGreen() {
    let randomTime = Math.random() * 3000 + 2000;
    this.timerId = setTimeout(() => this.turnGreen(), randomTime);
  }

  turnGreen() {
    this.isGreen = true;
    this.gameArea.nativeElement.style.backgroundColor = 'limegreen';
    this.startTime = performance.now();
  }

  handleGreenClick() {
    this.score = (performance.now() - this.startTime) + this.score;
    this.iterations++;
    this.isGreen = false;
    if (this.iterations < this.MAX_ITERATIONS) {
      this.gameArea.nativeElement.style.backgroundColor = 'tomato';
      this.scheduleTurnGreen();
    } else {
      this.gameEnded();
    }
  }

  handleRedClick() {
    clearTimeout(this.timerId);
    this.isTooSoon = true;
    this.gameArea.nativeElement.style.backgroundColor = 'orange';
  }

  resetGame() {
    this.gameStarted = false;
    this.isGreen = false;
    this.isTooSoon = false;
    this.isGameOver = false;
    this.iterations = 0;
    this.score = 0;
    this.gameArea.nativeElement.style.backgroundColor = 'orange';
  }

  gameEnded() {
    this.isGameOver = true;
    this.gameStarted = false;
    this.score = this.score / this.MAX_ITERATIONS;
    this.finalScore = this.score.toFixed(0);
    this.gameArea.nativeElement.style.backgroundColor = 'cornflowerblue';
  }
  
}
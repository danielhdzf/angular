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

  gameStarted = false;
  isGreen = false;
  isTooSoon = false;
  startTime!: number;
  timerId!: any;

  constructor() {
  }

  ngAfterViewInit() {
    this.gameArea.nativeElement.addEventListener('click', () => {
      if (!this.gameStarted) {
        this.startGame();
      } else if (this.isTooSoon) {
        this.resetGame();
      } else if (this.isGreen) {
        this.handleGreenClick();
      } else {
        this.handleRedClick();
      }
    });
  }

  startGame() {
    this.gameStarted = true;
    this.isGreen = false;
    this.isTooSoon = false;
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
    const reactionTime = performance.now() - this.startTime;
    alert(`¡Bien hecho! Tiempo de reacción: ${reactionTime.toFixed(0)} ms`);
    this.resetGame();
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
    this.gameArea.nativeElement.style.backgroundColor = 'orange';
  }
  
}
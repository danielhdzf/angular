import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simon',
  standalone: true,
  imports: [],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css'
})
export class SimonComponent {

  @ViewChild('startInfo') private startInfo!: ElementRef;
  
  colors = ['red', 'green', 'blue', 'yellow'];
  sequence: string[] = [];
  playerSequence: string[] = [];
  level: number = 0;
  message: string = '';

  startGame() {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 0;
    this.message = 'Game Started!';
    this.startInfo.nativeElement.style.display = 'none';
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
      this.message = 'Game Over!';
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
}


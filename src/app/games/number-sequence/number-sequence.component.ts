import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-number-sequence',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './number-sequence.component.html',
  styleUrl: './number-sequence.component.css'
})
export class NumberSequenceComponent {

  @ViewChild('startInfo') private startInfo!: ElementRef;
  @ViewChild('restartButton') private restartButton!: ElementRef;
  @ViewChild('saveButton') private saveButton!: ElementRef;
  @ViewChild('okAlert') private okAlert!: ElementRef;
  @ViewChild('errorAlert') private errorAlert!: ElementRef;

  sequence: string = '';
  userInput: string = '';
  level: number = 1;
  message: string = '';
  showSequence: boolean = true;
  progressBarWidth: number = 100;
  timerInterval: any;
  gameStarted: boolean = false;
  gameOver: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'none');
  }

  startGame() {
    this.gameStarted = true;
    this.generateSequence();
  }

  generateSequence(): void {
    this.sequence = '';
    for (let i = 0; i < this.level; i++) {
      this.sequence += Math.floor(Math.random() * 10).toString();
    }
    console.log(this.sequence);
    this.showSequence = true;
    this.progressBarWidth = 100;

    this.timerInterval = setInterval(() => {
      this.progressBarWidth -= 2;
      if (this.progressBarWidth <= 0) {
        this.showSequence = false;
        clearInterval(this.timerInterval);
      }
    }, 100);

    setTimeout(() => {
      this.showSequence = false;
      clearInterval(this.timerInterval);
    }, 5000);
  }

  verifySequence(): void {
    if (this.userInput == this.sequence) {
      this.level++;
      this.userInput = '';
      this.message = 'Correct! Level increased.';
      this.generateSequence();
    } else {
      this.gameOver = true;
      this.message = 'Incorrect sequence, it should be ' + this.sequence;
      this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'block');
    }
  }

  restartGame() {
    this.renderer.setStyle(this.saveButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.restartButton.nativeElement, 'display', 'none');
    this.gameStarted = false;
    this.gameOver = false;
    this.level = 1;
    this.userInput = '';
    this.showSequence = true;
    this.message = '';
  }

  saveScore() {
    this.scoreService.saveScore(localStorage.getItem('username')!, this.level, 'numberSequence').subscribe(
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
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-aim',
  standalone: true,
  imports: [],
  templateUrl: './color-aim.component.html',
  styleUrl: './color-aim.component.css'
})
export class ColorAimComponent implements AfterViewInit{

  @ViewChild('target1') private target1!: ElementRef;
  @ViewChild('target2') private target2!: ElementRef;
  @ViewChild('okAlert') private okAlert!: ElementRef;
  @ViewChild('errorAlert') private errorAlert!: ElementRef;

  MAX_ITERATIONS = 4;
  gameStarted: boolean = false;
  iterations!: number;
  score!: number;
  startTime!: number;
  finalScore!: string;
  timerId!: any;
  gameOver: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private renderer: Renderer2,
    private router: Router,
  ) {}

  ngAfterViewInit() {
  }

  startGame() {
    this.iterations = 0;
    this.score = 0;
    this.finalScore = '';
    this.gameStarted = true;
    this.scheduleChangeColor();
  }

  scheduleChangeColor() {
    if(this.iterations < this.MAX_ITERATIONS) {
      let randomTime = Math.floor(Math.random() * 3000) + 2000;
      this.timerId = setTimeout(() => {
        this.changeColor();
      }, randomTime);
      this.iterations++;
    } else {
      this.gameEnded();
    }
  }

  changeColor() {
      if((Math.random() < 0.5 ? this.target1 : this.target2) === this.target1) {
        this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'blue');
        this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'red');
  
      } else {
        this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'red');
        this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'blue');
      }
      this.startTime = performance.now(); 
  }

  handleTargetClick(target: string) {
    if(target === 'target1') {
      if(this.target1.nativeElement.style.backgroundColor === 'blue') {
        this.score = (performance.now() - this.startTime) + this.score;
        this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'black');
        this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'black');
        this.scheduleChangeColor();
      } 
    } else {
      if(this.target2.nativeElement.style.backgroundColor === 'blue') {
        this.score = (performance.now() - this.startTime) + this.score;
        this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'black');
        this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'black');
        this.scheduleChangeColor();
      }
    }
  }

  gameEnded() {
    this.finalScore = (this.score/4).toFixed(0);
    this.gameStarted = false;
    this.gameOver = true;
  }
  
  restartGame() {
    this.gameOver = false;
    this.startGame();
  }

  saveScore() {
    this.scoreService.saveScore(localStorage.getItem('username')!, parseInt(this.finalScore), 'colorAim').subscribe(
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



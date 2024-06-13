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

  MAX_ITERATIONS = 4;
  gameStarted: boolean = false;
  iterations!: number;
  score!: number;
  finalScore!: string;
  timerId!: any;

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
    let randomTime = Math.floor(Math.random() * 3000) + 2000;
    this.timerId = setTimeout(() => {
      this.changeColor();
    }, randomTime);
  }

  changeColor() {
    if((Math.random() < 0.5 ? this.target1 : this.target2) === this.target1) {
      this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'blue');
      this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'red');

    } else {
      this.renderer.setStyle(this.target1.nativeElement, 'background-color', 'red');
      this.renderer.setStyle(this.target2.nativeElement, 'background-color', 'blue');
    }    
  }

  handleTargetClick() {}
}

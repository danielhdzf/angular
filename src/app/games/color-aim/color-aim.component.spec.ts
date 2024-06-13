import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAimComponent } from './color-aim.component';

describe('ColorAimComponent', () => {
  let component: ColorAimComponent;
  let fixture: ComponentFixture<ColorAimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorAimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSequenceComponent } from './number-sequence.component';

describe('NumberSequenceComponent', () => {
  let component: NumberSequenceComponent;
  let fixture: ComponentFixture<NumberSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSequenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

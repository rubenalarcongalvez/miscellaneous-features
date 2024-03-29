import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBreakComponent } from './word-break.component';

describe('WordBreakComponent', () => {
  let component: WordBreakComponent;
  let fixture: ComponentFixture<WordBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordBreakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAnimationsComponent } from './display-animations.component';

describe('DisplayAnimationsComponent', () => {
  let component: DisplayAnimationsComponent;
  let fixture: ComponentFixture<DisplayAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAnimationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

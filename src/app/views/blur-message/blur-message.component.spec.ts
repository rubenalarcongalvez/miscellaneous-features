import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurMessageComponent } from './blur-message.component';

describe('BlurMessageComponent', () => {
  let component: BlurMessageComponent;
  let fixture: ComponentFixture<BlurMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlurMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

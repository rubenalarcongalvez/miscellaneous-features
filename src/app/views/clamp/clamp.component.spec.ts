import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClampComponent } from './clamp.component';

describe('ClampComponent', () => {
  let component: ClampComponent;
  let fixture: ComponentFixture<ClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

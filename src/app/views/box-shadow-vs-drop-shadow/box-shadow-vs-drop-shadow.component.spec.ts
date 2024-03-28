import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowVsDropShadowComponent } from './box-shadow-vs-drop-shadow.component';

describe('BoxShadowVsDropShadowComponent', () => {
  let component: BoxShadowVsDropShadowComponent;
  let fixture: ComponentFixture<BoxShadowVsDropShadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxShadowVsDropShadowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxShadowVsDropShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

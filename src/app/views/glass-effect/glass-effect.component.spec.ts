import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassEffectComponent } from './glass-effect.component';

describe('GlassEffectComponent', () => {
  let component: GlassEffectComponent;
  let fixture: ComponentFixture<GlassEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlassEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUnderConstructionComponent } from './section-under-construction.component';

describe('SectionUnderConstructionComponent', () => {
  let component: SectionUnderConstructionComponent;
  let fixture: ComponentFixture<SectionUnderConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionUnderConstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionUnderConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

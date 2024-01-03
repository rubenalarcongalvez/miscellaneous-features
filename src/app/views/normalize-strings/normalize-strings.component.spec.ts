import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizeStringsComponent } from './normalize-strings.component';

describe('NormalizeStringsComponent', () => {
  let component: NormalizeStringsComponent;
  let fixture: ComponentFixture<NormalizeStringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalizeStringsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormalizeStringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSizingComponent } from './field-sizing.component';

describe('FieldSizingComponent', () => {
  let component: FieldSizingComponent;
  let fixture: ComponentFixture<FieldSizingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldSizingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldSizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

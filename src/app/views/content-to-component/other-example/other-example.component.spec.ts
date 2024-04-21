import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExampleComponent } from './other-example.component';

describe('OtherExampleComponent', () => {
  let component: OtherExampleComponent;
  let fixture: ComponentFixture<OtherExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

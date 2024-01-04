import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWallComponent } from './payment-wall.component';

describe('PaymentWallComponent', () => {
  let component: PaymentWallComponent;
  let fixture: ComponentFixture<PaymentWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentWallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

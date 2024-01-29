import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWrapBalanceComponent } from './text-wrap-balance.component';

describe('TextWrapBalanceComponent', () => {
  let component: TextWrapBalanceComponent;
  let fixture: ComponentFixture<TextWrapBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWrapBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextWrapBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

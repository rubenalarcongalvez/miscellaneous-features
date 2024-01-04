import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAccordionComponent } from './basic-accordion.component';

describe('BasicAccordionComponent', () => {
  let component: BasicAccordionComponent;
  let fixture: ComponentFixture<BasicAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

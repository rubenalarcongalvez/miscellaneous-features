import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentToComponentComponent } from './content-to-component.component';

describe('ContentToComponentComponent', () => {
  let component: ContentToComponentComponent;
  let fixture: ComponentFixture<ContentToComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentToComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentToComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

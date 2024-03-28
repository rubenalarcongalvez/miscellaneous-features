import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithVideoOrImageBackgroundComponent } from './text-with-video-or-image-background.component';

describe('TextWithVideoOrImageBackgroundComponent', () => {
  let component: TextWithVideoOrImageBackgroundComponent;
  let fixture: ComponentFixture<TextWithVideoOrImageBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithVideoOrImageBackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextWithVideoOrImageBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

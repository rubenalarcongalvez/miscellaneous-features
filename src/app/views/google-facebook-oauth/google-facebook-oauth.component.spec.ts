import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleFacebookOauthComponent } from './google-facebook-oauth.component';

describe('GoogleFacebookOauthComponent', () => {
  let component: GoogleFacebookOauthComponent;
  let fixture: ComponentFixture<GoogleFacebookOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleFacebookOauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleFacebookOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

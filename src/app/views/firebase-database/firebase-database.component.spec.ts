import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseDatabaseComponent } from './firebase-database.component';

describe('FirebaseDatabaseComponent', () => {
  let component: FirebaseDatabaseComponent;
  let fixture: ComponentFixture<FirebaseDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirebaseDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

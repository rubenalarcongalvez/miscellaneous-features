import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportExcelCancelPetitionsComponent } from './export-excel-cancel-petitions.component';

describe('ExportExcelCancelPetitionsComponent', () => {
  let component: ExportExcelCancelPetitionsComponent;
  let fixture: ComponentFixture<ExportExcelCancelPetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportExcelCancelPetitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportExcelCancelPetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

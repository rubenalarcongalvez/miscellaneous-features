import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StylesModule } from '../../shared/styles/styles.module';
import { ExcelService, UserToExcel } from '../../shared/services/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, finalize, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-export-excel-cancel-petitions',
  standalone: true,
  imports: [ReactiveFormsModule, StylesModule],
  templateUrl: './export-excel-cancel-petitions.component.html',
  styleUrl: './export-excel-cancel-petitions.component.scss'
})
export class ExportExcelCancelPetitionsComponent {
  dataToExport: UserToExcel[] = [];
  form: FormGroup = this.fb.group({
    user: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    surname1: ['', Validators.required],
    surname2: [''],
    numberOfChildren: [0, [Validators.required, Validators.min(0)]],
  });

  private destroyExcelRequest$ = new Subject<void>();
  loadingExcel: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private excelService: ExcelService) {}

  addToList() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.snackBar.open('Please, fill in the information.', 'Got it!', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }

    // If the form is valid, create a new UserToExcel object
    const userToAdd: UserToExcel = {
      user: this.form.value.user,
      name: this.form.value.name,
      description: this.form.value.description,
      surname: {
        first: this.form.value.surname1,
        second: this.form.value?.surname2 || '',
      },
      numberOfChildren: this.form.value.numberOfChildren,
    };

    // Add the new user to the list
    this.dataToExport.push(userToAdd);

    // Reset the form after adding the user
    this.form.reset({
      numberOfChildren: 0
    });

    this.snackBar.open('User added', 'Got it!', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  removeFromList(index: number) {
    this.dataToExport.splice(index, 1);
  }

  exportExcel() {
    this.loadingExcel = true;
    // This is just an example, in practice it would be with real requests, but it works the same way
    of(this.dataToExport).pipe(
      catchError((error) => {
        this.snackBar.open('Could not export correctly', 'OK');
        return of([]); // Returns an empty array in case of error
      }),
      delay(3000), // Just for example, not necessary
      takeUntil(this.destroyExcelRequest$), // While the request is not canceled
      finalize(() => {
        this.loadingExcel = false; // This will run at the end, after the delay
      })
    ).subscribe({
      next: (response: UserToExcel[]) => {
        this.excelService.getExcel(response);
      }
    });
  }

  cancelExcelRequest() {
    this.destroyExcelRequest$.next();
    this.destroyExcelRequest$.complete();
    this.destroyExcelRequest$ = new Subject<void>(); // Reactivate it so it can be destroyed again
    this.loadingExcel = false;
  }

  ngOnDestroy() {
    this.destroyExcelRequest$.next();
    this.destroyExcelRequest$.complete();
  }
}
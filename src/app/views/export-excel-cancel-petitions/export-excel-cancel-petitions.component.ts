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

  private destroyPeticionExcel$ = new Subject<void>();
  loadingExcel: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private excelService: ExcelService) {}
  
  addToList() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
  
      this.snackBar.open('Please, fill up the information.', 'Got it!', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
  
    // Si el formulario es válido, crear un nuevo objeto UserToExcel
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
  
    // Agregar el nuevo usuario a la lista
    this.dataToExport.push(userToAdd);
  
    // Resetear el formulario después de agregar el usuario
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
    // Esto es solo un ejemplo, en la práctica, es con peticiones de verdad, pero viene a ser lo mismo
    of(this.dataToExport).pipe(
      catchError((error) => {
        this.snackBar.open('No se ha podido exportar correctamente', 'Aceptar');
        return of([]); // Retorna un array vacío en caso de error
      }),
      delay(3000), // Solo para mostrarlo de ejemplo, no es necesario
      takeUntil(this.destroyPeticionExcel$), // Mientras no se cancele la petición
      finalize(() => {
        this.loadingExcel = false; // Esto se ejecutará al final, después del delay
      })
    ).subscribe({
      next: (response: UserToExcel[]) => {
        this.excelService.getExcel(response);
      }
    });
  }

  cancelPetitionExcel() {
    this.destroyPeticionExcel$.next();
    this.destroyPeticionExcel$.complete();
    this.destroyPeticionExcel$ = new Subject<void>(); //Volvemos a activar para que se pueda destruir
    this.loadingExcel = false;
  }

  ngOndestroy() {
    this.destroyPeticionExcel$.next();
    this.destroyPeticionExcel$.complete();
  }
  
}
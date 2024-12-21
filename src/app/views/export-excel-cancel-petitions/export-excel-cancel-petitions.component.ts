import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StylesModule } from '../../shared/styles/styles.module';
import { UserToExcel } from '../../shared/services/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    description: ['', Validators.required],
    surname1: ['', Validators.required],
    surname2: [''],
    numberOfChildren: ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}
  
  addToList() {
    // Verificar si el formulario es válido
    if (this.form.invalid) {
      // Marcar todos los controles del formulario como tocados
      this.form.markAllAsTouched();
  
      // Mostrar un snackbar con un mensaje de error
      this.snackBar.open('Por favor, completa todos los campos requeridos correctamente.', 'Cerrar', {
        duration: 3000, // Duración en milisegundos
        panelClass: ['snackbar-error'], // Clase CSS opcional para personalizar el estilo
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
        second: this.form.value?.surname1,
      },
      numberOfChildren: this.form.value.numberOfChildren,
    };
  
    // Agregar el nuevo usuario a la lista
    this.dataToExport.push(userToAdd);
  
    // Resetear el formulario después de agregar el usuario
    this.form.reset();
  
    // Mostrar un snackbar de confirmación
    this.snackBar.open('Usuario agregado exitosamente.', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: ['snackbar-success'], // Clase CSS opcional para personalizar el estilo
    });
  }

  removeFromList(index: number) {
    this.dataToExport.splice(index, 1);
  }
  
}
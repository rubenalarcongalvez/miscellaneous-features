import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface UserToExcel {
  user: string,
  name: string,
  description: string,
  surname: Surname,
  numberOfChildren: number,
}

interface Surname {
  first: string,
  second?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  getExcel(UserToExcel: UserToExcel[]) {
    // Definir los encabezados de las columnas
    const header = [
      'User',
      'Description',
      'Name',
      'Surname',
      'Number of children',
    ];

    // Crear el libro de trabajo y la hoja
    const wb = XLSX.utils.book_new();
    const wsData = UserToExcel.map(dato => [
      dato.user ?? '',
      dato.description ?? '',
      dato.name ?? '',
      dato.surname?.first + ' ' + dato.surname?.second,
      dato.numberOfChildren ?? '',
    ]);

    // Crear la hoja de Excel con los encabezados y los datos
    const ws = XLSX.utils.aoa_to_sheet([header, ...wsData]);

    // Ajustar el ancho de las columnas para que se vean bien
    const colWidths = header.map(col => ({ wpx: Math.max(...wsData.map((row: any) => row[header.indexOf(col)]?.toString().length), col.length * 10) }));
    ws['!cols'] = colWidths;

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Generar y guardar el archivo Excel
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelFile, 'generated-excel.xlsx');
  }
}

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
    // Define the column headers
    const header = [
      'User',
      'Description',
      'Name',
      'Surname',
      'Number of children',
    ];

    // Create the workbook and worksheet
    const wb = XLSX.utils.book_new();
    const wsData = UserToExcel.map(data => [
      data.user ?? '',
      data.description ?? '',
      data.name ?? '',
      data.surname?.first + ' ' + data.surname?.second,
      data.numberOfChildren ?? '',
    ]);

    // Create the worksheet with headers and data
    const ws = XLSX.utils.aoa_to_sheet([header, ...wsData]);

    // Adjust column widths for better display
    const colWidths = header.map(col => ({ wpx: Math.max(...wsData.map((row: any) => row[header.indexOf(col)]?.toString().length), col.length * 10) }));
    ws['!cols'] = colWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Generate and save the Excel file
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelFile, 'generated-excel.xlsx');
  }
}

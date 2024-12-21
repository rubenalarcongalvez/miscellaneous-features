import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-field-sizing',
    imports: [CommonModule],
    templateUrl: './field-sizing.component.html',
    styleUrl: './field-sizing.component.scss'
})
export class FieldSizingComponent {
  years: number[] = [];

  ngOnInit() {
    const actualYear = new Date().getFullYear();
    for (let i = 0; i < 80; i++) {
      this.years.push(actualYear - i);
    }
  }
}

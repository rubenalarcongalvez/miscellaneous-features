import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-custom-cursor',
    imports: [CommonModule],
    templateUrl: './custom-cursor.component.html',
    styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent {
  customCursor: boolean = false;
}

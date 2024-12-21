import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-transitions',
    imports: [CommonModule],
    templateUrl: './transitions.component.html',
    styleUrl: './transitions.component.scss'
})
export class TransitionsComponent {
  state2: boolean = false;
  hidden: boolean = true;
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-animations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-animations.component.html',
  styleUrl: './display-animations.component.scss'
})
export class DisplayAnimationsComponent {
  contentShowed: boolean = false;
}

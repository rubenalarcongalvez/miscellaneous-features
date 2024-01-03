import { Component } from '@angular/core';

@Component({
  selector: 'app-normalize-strings',
  standalone: true,
  imports: [],
  templateUrl: './normalize-strings.component.html',
  styleUrl: './normalize-strings.component.scss'
})
export class NormalizeStringsComponent {
  nonNormalizedString = 'Málaga et les equipès de le coq sportîf'; //Non sense string but valid as example
  normalizedString = String(this.nonNormalizedString.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

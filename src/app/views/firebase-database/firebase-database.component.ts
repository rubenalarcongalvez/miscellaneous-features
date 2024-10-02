import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-firebase-database',
  standalone: true,
  imports: [],
  templateUrl: './firebase-database.component.html',
  styleUrl: './firebase-database.component.scss'
})
export class FirebaseDatabaseComponent {
  workInProgress = signal<string>('');
  sentence: string = 'Section under construction. Work in progress...';
  index: number = this.sentence.length;

  constructor() {
    setInterval(() => { // Cambia la función a async
        if (this.index == this.sentence.length) {
          this.index = 0;
          this.workInProgress.set('');
        }
          
        this.workInProgress.update((prevValue) => prevValue + this.sentence.at(this.index));
        this.index++;
    }, 150);
  }
}

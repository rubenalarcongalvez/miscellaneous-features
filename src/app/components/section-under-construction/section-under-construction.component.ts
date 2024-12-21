import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-section-under-construction',
    imports: [],
    templateUrl: './section-under-construction.component.html',
    styleUrl: './section-under-construction.component.scss'
})
export class SectionUnderConstructionComponent {
  workInProgress = signal<string>('');
  sentence: string = 'Section under construction. Work in progress...';
  index: number = this.sentence.length;

  constructor() {
    setInterval(() => {
        if (this.index == this.sentence.length) {
          this.index = 0;
          this.workInProgress.set('');
        }
          
        this.workInProgress.update((prevValue) => prevValue + this.sentence.at(this.index));
        this.index++;
    }, 150);
  }
}

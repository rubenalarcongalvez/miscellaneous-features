import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-other-example',
    imports: [],
    templateUrl: './other-example.component.html',
    styleUrl: './other-example.component.scss'
})
export class OtherExampleComponent {
  @Input() selectorName: string = '</app-other-example></app-other-example>';
}

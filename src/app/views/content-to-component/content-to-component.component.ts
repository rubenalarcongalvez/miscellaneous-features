import { Component } from '@angular/core';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { OtherExampleComponent } from './other-example/other-example.component';
import { ExampleComponentModule } from './example-component/example-component.module';

@Component({
  selector: 'app-content-to-component',
  standalone: true,
  imports: [OtherExampleComponent, ExampleComponentModule], //We should do a module to all related to ExampleComponent (component, imports, directives...) and import all of them together instead of all separate
  providers: [ExampleComponentComponent],
  templateUrl: './content-to-component.component.html',
  styleUrl: './content-to-component.component.scss'
})
export class ContentToComponentComponent {
  constructor(public exampleComponent: ExampleComponentComponent) {}
}

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[exampleDirective]',
  standalone: true
})
export class ExampleDirectiveDirective {
  constructor() { }
}

import { NgModule } from '@angular/core';
import { ExampleDirectiveDirective } from './directives/example-directive.directive';
import { CommonModule } from '@angular/common';
import { ExampleComponentComponent } from './example-component.component';

@NgModule({
  declarations: [ExampleComponentComponent],
  imports: [
    CommonModule,
    ExampleDirectiveDirective
  ],
  exports: [
    // It's important not to export CommonModule or any module that we don't want to suggest to us additionally, because we will already import it standalone in the other component where we import the module.
    // We will only import what is necessary, in this case the component and its own directives.
    ExampleComponentComponent,
    ExampleDirectiveDirective
  ]
})
export class ExampleComponentModule { }

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
    //Es importante no exportar CommonModule o cualquier modulo que no queramos que nos sugiera extra, porque eso ya lo importaremos standalone en el otro componente donde importemos el modulo
    //Solo importaremos lo necesario, en este caso el componente y las directivas propias del mismo
    ExampleComponentComponent,
    ExampleDirectiveDirective
  ]
})
export class ExampleComponentModule { }

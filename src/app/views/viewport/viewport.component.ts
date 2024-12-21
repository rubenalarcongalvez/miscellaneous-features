import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicInputDirective } from '../../shared/directives/dynamic-input-width.directive';

@Component({
    selector: 'app-viewport',
    imports: [ReactiveFormsModule, DynamicInputDirective],
    templateUrl: './viewport.component.html',
    styleUrl: './viewport.component.scss'
})
export class ViewportComponent {
  
  constructor(private fb: FormBuilder) {}

  refresh() {
    window.location.reload();
  }

  normal: FormGroup = this.fb.group({
    width: '250',
    height: '50'
  });
  main: FormGroup = this.fb.group({
    width: '50',
    height: '15'
  });
  min: FormGroup = this.fb.group({
    width: '0',
    minWidth: '28'
  });
  max: FormGroup = this.fb.group({
    width: '9999999',
    maxWidth: '28'
  });
  variable: FormGroup = this.fb.group({
    width1: '250',
    sHeight: '100',
    width2: '250',
    lHeight: '100',
    width3: '250',
    dHeight: '100',
  });
  
}

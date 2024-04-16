import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[dynamic-input]',
  standalone: true
})
export class DynamicInputDirective {
  constructor(private el: ElementRef) {
    this.resize();
  }

  @HostListener('keyup') onKeyUp() {
    this.resize();
  }

  private resize() {
    this.el.nativeElement.setAttribute(
      'size',
      this.el.nativeElement.value.length || 2
    );
  }
}
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrl: './example-component.component.scss'
})
export class ExampleComponentComponent {
  @Input() header: string = 'Default Header'; //We can use inputs as well if we like
  @Input() expanded: boolean = false;
  @Input() fullHeight: boolean = true;
  @ContentChild('handleLoadTemplateExample') handleLoadTemplateExample?: TemplateRef<unknown>; //We can refer to the elements we want so they will NOT load if we do not want, for example in a ngIf
  @ContentChild('secondTemplateExample') secondTemplateExample?: TemplateRef<unknown>; //We can refer to the elements we want so they will NOT load if we do not want, for example in a ngIf

  /* Just to say the component is loaded to work with contentchilds */
  ngOnInit() {
    console.log('Loaded');
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}

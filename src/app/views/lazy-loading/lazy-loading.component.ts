import { Component } from '@angular/core';

@Component({
    selector: 'app-lazy-loading',
    imports: [],
    templateUrl: './lazy-loading.component.html',
    styleUrl: './lazy-loading.component.scss'
})
export class LazyLoadingComponent {
  
  
  refresh() {
    window.location.reload();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-blur-message',
  standalone: true,
  imports: [],
  templateUrl: './blur-message.component.html',
  styleUrl: './blur-message.component.scss'
})
export class BlurMessageComponent {
  title: string = document.title; //We save the original title

  ngOnInit() {
    /* We can change what we need as the title, icon, etc. */

    /* We put Event Listener when we leave the tab */
    window.addEventListener('blur', () => {
      document.title = 'Please, come back 😢';
    });

    /* We put Event Listener when we focus the tab */
    window.addEventListener('focus', () => {
      document.title = this.title;
    });
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../page/style/material/material.module';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../page/services/global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sidenavFullscreen: boolean = false;
  checkedDarkMode: boolean = false;

  constructor(private router: Router) {}

  get activeTab(): string {
    return this.router.url.replaceAll('-', ' ').replace('/', '');
  }

  toggleDarkScheme() {
    this.checkedDarkMode = !this.checkedDarkMode;
    this.checkedDarkMode ? document.documentElement.style.colorScheme = 'dark' : document.documentElement.style.colorScheme = 'light';
  }
}

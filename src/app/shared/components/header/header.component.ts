import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../shared/style/material.module';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(public router: Router, private storageService: StorageService, private authService: AuthService) {}

  get activeTab(): string {
    return this.router.url.replaceAll('-', ' ').replace('/', '');
  }

  public get loggedIn() : boolean {
    // return this.authService.getCurrentUser() != null; //It is a bit slow to detect it on first instance
    return this.storageService.isLoggedIn(); //In case we use localStorage
  }  

  logout() {
    this.authService.logout();
  }

  toggleDarkScheme() {
    this.checkedDarkMode = !this.checkedDarkMode;
    this.checkedDarkMode ? document.documentElement.style.colorScheme = 'dark' : document.documentElement.style.colorScheme = 'light';
  }
}

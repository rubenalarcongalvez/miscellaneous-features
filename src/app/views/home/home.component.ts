import { Component } from '@angular/core';
import { StylesModule } from '../../shared/styles/styles.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StylesModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private readonly authService: AuthService, private readonly storageService: StorageService) {}

  public get loggedIn() : boolean {
    // return this.authService.getCurrentUser() != null; //It is a bit slow to detect it on first instance
    return this.storageService.isLoggedIn(); //In case we use localStorage
  } 
}

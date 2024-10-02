import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/components/login/login.component';
import { StorageService } from '../../shared/services/storage.service';
import { StylesModule } from '../../shared/styles/styles.module';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-google-facebook-oauth',
  standalone: true,
  imports: [LoginComponent, StylesModule],
  templateUrl: './google-facebook-oauth.component.html',
  styleUrl: './google-facebook-oauth.component.scss'
})
export class GoogleFacebookOauthComponent {
  constructor(private storageService: StorageService, private authService: AuthService) {}

  public get loggedIn() : boolean {
    return this.storageService.isLoggedIn();
  }  

  logout() {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/components/login/login.component';
import { StorageService } from '../../shared/services/storage.service';
import { StylesModule } from '../../shared/styles/styles.module';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-google-facebook-oauth',
    imports: [LoginComponent, StylesModule, ReactiveFormsModule, CommonModule],
    templateUrl: './google-facebook-oauth.component.html',
    styleUrl: './google-facebook-oauth.component.scss'
})
export class GoogleFacebookOauthComponent {
  visibleDeleteUserPopup: boolean = false;
  visibleUpdateEmailPopup: boolean = false;
  visibleUpdatePasswordPopup: boolean = false;
  messages: Message[] = [];

  updateEmailForm: FormGroup = this.fb.group({
    previousEmail: ['', Validators.required],
    email: ['', Validators.required],
    emailConfirmation: ['', Validators.required],
  });
  updatePasswordForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  });

  constructor(private storageService: StorageService, private authService: AuthService, private _snackBar: MatSnackBar, private fb: FormBuilder) {}

  public get loggedIn() : boolean {
    // return this.authService.getCurrentUser() != null; //It is a bit slow to detect it on first instance
    return this.storageService.isLoggedIn(); //In case we use localStorage
  } 
  
  public get getUser() : User | null {
    return this.authService.getCurrentUser();
  }

  isEmailAuth(): boolean {
    if (this.getUser && this.getUser?.providerData?.findIndex(p => p.providerId === 'password') != -1) {
      return true;
    }
    return false;
  }

  updateUserEmail() {
    if (this.updateEmailForm.get('previousEmail')?.value == this.getUser?.email && this.updateEmailForm.valid && this.updateEmailForm.get('email')?.value == this.updateEmailForm.get('emailConfirmation')?.value) {
      this.authService.updateEmail(this.getUser!, this.updateEmailForm.get('email')?.value).then(() => {
        this.updateEmailForm.reset();
        this.visibleUpdateEmailPopup = false;
        this._snackBar.open('Please, confirm the update by email and log in again', 'Got it!', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }).catch((err: Error) => {
        if (err.message.includes('requires-recent-login')) {
          this._snackBar.open('You must log in again to make the action', 'Got it!', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          setTimeout(() => {
            this.logout();
          }, 2000); 
        } else {
          this.messages = [({ severity: 'error', detail: 'You cannot change to this email' })];
        }
        console.error(err);
      });
    } else {
      this.messages = [];
      if (this.updateEmailForm.get('previousEmail')?.value != this.getUser?.email) {
        this.messages.push({ severity: 'error', detail: 'Previous email is incorrect' });
      }
      if (this.updateEmailForm.invalid) {
        this.messages.push({ severity: 'warn', detail: 'Please, put a new valid email' });
      }
      if (this.updateEmailForm.get('email')?.value != this.updateEmailForm.get('emailConfirmation')?.value) {
        this.messages.push({ severity: 'warn', detail: "New emails don't match" });
      }
    }
  }

  updateUserPassword() {
    if (this.updatePasswordForm.valid && this.updatePasswordForm.get('password')?.value == this.updatePasswordForm.get('passwordConfirmation')?.value) {
      this.authService.updatePassword(this.getUser!, this.updatePasswordForm.get('password')?.value).then(() => {
        this.updatePasswordForm.reset();
        this.visibleUpdatePasswordPopup = false;
        this._snackBar.open('Password updated successfully', 'Got it!', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }).catch((err: Error) => {
        if (err.message.includes('requires-recent-login')) {
          this._snackBar.open('You must log in again to make the action', 'Got it!', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          setTimeout(() => {
            this.logout();
          }, 2000); 
          this.logout();
        } else {
          this.messages = [({ severity: 'error', detail: 'You cannot change to this password' })];
        }
        console.error(err);
      });
    } else {
      this.messages = [];
      if (this.updatePasswordForm.invalid) {
        this.messages.push({ severity: 'warn', detail: 'The password should be at least 6 character long and it must have a maximum of 30 characters and cannot contain <code>|\\/</code>' });
      }
      if (this.updatePasswordForm.get('password')?.value != this.updatePasswordForm.get('passwordConfirmation')?.value) {
        this.messages.push({ severity: 'warn', detail: "New passwords don't match" });
      }
    }
  }

  deleteUser() {
    this.authService.deleteUser(this.getUser!).then(() => {
      this.visibleDeleteUserPopup = false;
      this._snackBar.open('User deleted', 'OK', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      setTimeout(() => {
        this.logout();
      }, 2000);
    }).catch((err: Error) => {
      if (err.message.includes('requires-recent-login')) {
        this._snackBar.open('You must log in again to make the action', 'Got it!', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          setTimeout(() => {
            this.logout();
          }, 2000); 
        this.logout();
      } 
      console.error(err);
    });
  }

  logout() {
    this.authService.logout();
  }
}

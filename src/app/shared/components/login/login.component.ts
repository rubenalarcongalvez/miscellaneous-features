import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StylesModule } from '../../styles/styles.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { StorageService } from '../../services/storage.service';
import { AuthService, SocialLoginMethods } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [StylesModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  visiblePopup = signal<boolean>(false);
  visibleRegisterPopup: boolean = false;
  visibleLoginPopup: boolean = false;
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  loadingLoginRegister: boolean = false;
  errorMessages: Message[] = [];
  socialLoginMethods = SocialLoginMethods;

  constructor(private fb: FormBuilder, private storageService: StorageService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    effect(() => {
      if (!this.visiblePopup()) {
        this.visibleRegisterPopup = false;
        this.visibleLoginPopup = false;
      }
    })
  }

  public get visiblePopupVariable() : boolean {
    return this.visiblePopup();
  }

  public set visiblePopupVariable(v : boolean) {
    this.visiblePopup.set(v);
  }
  

  public get loggedIn() : boolean {
    return this.storageService.isLoggedIn();
  } 

  reset() {
    this.form.reset();
  }

  loginRegister() {
    this.errorMessages = [];
    if (this.form.valid) {
      this.loadingLoginRegister = true;
      this.authService.loginRegister(this.form.get('email')?.value, this.form.get('password')?.value, this.visibleRegisterPopup).then((userCredential) => {
        userCredential.user.getIdToken(true).then((token) => {
          this.storageService.saveUser({
            email: userCredential.user.email!,
            token: token
          });
          this.visiblePopup.set(false);
          this.router.navigateByUrl('firebase-database');
          if (this.visibleRegisterPopup) {
            this._snackBar.open('User register successful', 'Got it!', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
          } else {
            this._snackBar.open('Logged in', 'Got it!', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        if (this.visibleRegisterPopup) {
          this.errorMessages = [{ severity: 'error', detail: 'Email is already in use' }];
        } else {
          this.errorMessages = [{ severity: 'error', detail: 'Incorrect Email or password' }];
        }
      })
      .finally(() => {
        this.form.get('password')?.reset();
        this.loadingLoginRegister = false;
      });
    } else {
      this.form.markAllAsTouched();
      if (this.form.get('email')?.invalid) {
        this.errorMessages.push({ severity: 'warn', detail: 'You need to put a real email' });
      }
      if (this.form.get('password')?.invalid) {
        this.errorMessages.push({ severity: 'warn', detail: 'The password should be at least 6 character long and it must have a maximum of 30 characters and cannot contain <code>|\\/</code>' });
      }
    }
  }

  //Instead of using lots of methods, I prefer to unify it (just a way, you can vary it)
  socialLogin(socialLoginMethod: SocialLoginMethods) {
    this.authService.socialLogin(socialLoginMethod).then((userCredential) => {
      userCredential.user.getIdToken(true).then((token) => {
        this.storageService.saveUser({
          email: userCredential.user.email!,
          token: token
        });
        this.visiblePopup.set(false);
        this.router.navigateByUrl('firebase-database');
        if (this.visibleRegisterPopup) {
          this._snackBar.open('User register successful', 'Got it!', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        } else {
          this._snackBar.open('Logged in', 'Got it!', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      this._snackBar.open('Something went wrong', ':(', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}

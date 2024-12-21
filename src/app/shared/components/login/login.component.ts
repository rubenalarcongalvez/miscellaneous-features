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
    passwordConfirmation: [''],
  });
  loadingLoginRegister: boolean = false;
  messages: Message[] = [];
  socialLoginMethods = SocialLoginMethods;
  lastTimeVerification: Date | null = null;
  lastTimePasswordReset: Date | null = null;

  constructor(private readonly fb: FormBuilder, private readonly storageService: StorageService, private readonly authService: AuthService, private readonly router: Router, private readonly _snackBar: MatSnackBar) {
    effect(() => {
      if (!this.visiblePopup()) {
        this.visibleRegisterPopup = false;
        this.visibleLoginPopup = false;
        this.messages = [];
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
    // return this.authService.getCurrentUser() != null; //It is a bit slow to detect it on first instance
    return this.storageService.isLoggedIn(); //In case we use localStorage
  } 

  public get errors() : boolean {
    return this.messages.some(err => err.severity == 'error');
  }

  public get verifyEmail() : boolean {
    return this.messages.some(err => err.detail?.includes('verify'));
  }
  
  private resetPasswordDifference() {
    if (this.lastTimePasswordReset == null) {
      return 60;
    }
    return (new Date().getTime() - this.lastTimePasswordReset.getTime()) / 1000;
  }

  /* Returns true when it is allowed to send reset to email */
  allowedResetPassword() {
    if (this.lastTimePasswordReset == null) {
      return true; // No previous verification, allow operation
    }
    const differenceInSeconds = (new Date().getTime() - this.lastTimePasswordReset.getTime()) / 1000;
    // Return true if more than 1 minute has passed
    return differenceInSeconds > 60;
  } 

  resetPassword() {
    if (this.allowedResetPassword()) {
      this.authService.sendPasswordResetEmail(this.form.get('email')?.value);
      this.lastTimePasswordReset = new Date();
      this.messages = [{ severity: 'success', detail: 'Email password reset sended' }];
    } else {
      this.messages = [{ severity: 'error', detail: 'Incorrect Email or password' }, { severity: 'info', detail: `Please, wait ${60 - +this.resetPasswordDifference().toFixed(0)} seconds` }];
    }
  }

  private verificationDifference() {
    if (this.lastTimeVerification == null) {
      return 60;
    }
    return (new Date().getTime() - this.lastTimeVerification.getTime()) / 1000;
  }

  /* Returns true when it is allowed to verify */
  allowedVerifyCooldown() {
    if (this.lastTimeVerification == null) {
      return true; // No previous verification, allow operation
    }
    const differenceInSeconds = (new Date().getTime() - this.lastTimeVerification.getTime()) / 1000;
    // Return true if more than 1 minute has passed
    return differenceInSeconds > 60;
  } 

  sendEmailVerification() {
    /* User cannot send another email unless 1 minute passes */
    if (this.allowedVerifyCooldown()) {
      this.authService.sendVerificationEmail(this.authService.getCurrentUser()!);
      this.lastTimeVerification = new Date();
      this.messages = [{ severity: 'success', detail: 'Email verification sended' }];
    } else {
      this.messages = [{ severity: 'warn', detail: 'Please, verify your email to log in' }, { severity: 'info', detail: `Please, wait ${60 - +this.verificationDifference().toFixed(0)} seconds` }];
    }
  }

  loginRegister() {
    this.messages = [];
    if ((this.form.valid && !this.visibleRegisterPopup) || (this.form.valid && this.visibleRegisterPopup && this.form.get('password')?.value == this.form.get('passwordConfirmation')?.value)) {
      this.loadingLoginRegister = true;
      this.authService.loginRegister(this.form.get('email')?.value, this.form.get('password')?.value, this.visibleRegisterPopup).then((userCredential) => {
        /* We get the token to save it for our own backend if we need it */
        userCredential.user.getIdToken(true).then((token) => {
          if (this.visibleRegisterPopup) {
            this.authService.sendVerificationEmail(userCredential.user);
            this._snackBar.open('User register successful. Please, verify your email.', 'Got it!', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            this.visiblePopup.set(false);
          } else if (userCredential.user.emailVerified) {
            /* Verify the email, if not, user cannot login */
              this.storageService.saveUser({
                email: userCredential.user.email!,
                token: token
              });
              this.visiblePopup.set(false);
              this.router.navigateByUrl('firebase-database');
              this._snackBar.open('Logged in', 'Got it!', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
              });
            } else {
              this.messages = [{ severity: 'warn', detail: 'Please, verify your email to log in' }];
          }
        });
      })
      .catch((err: Error) => {
        if (this.visibleRegisterPopup) {
          if (err.message.includes('email-already-in-use')) {
            this.messages = [{ severity: 'error', detail: 'Email is already in use' }];
          } else {
            console.error(err);
          }
        } else {
          this.messages = [{ severity: 'error', detail: 'Incorrect Email or password' }];
        }
        console.log(err);
      })
      .finally(() => {
        this.form.get('password')?.reset();
        this.form.get('passwordConfirmation')?.reset();
        this.loadingLoginRegister = false;
      });
    } else {
      this.form.markAllAsTouched();
      if (this.form.get('email')?.invalid) {
        this.messages.push({ severity: 'warn', detail: 'You need to put a real email' });
      }
      if (this.form.get('password')?.invalid) {
        this.messages.push({ severity: 'warn', detail: 'The password should be at least 6 character long and it must have a maximum of 30 characters and cannot contain <code>|\\/</code>' });
      }
      if (this.visibleRegisterPopup && this.form.get('password')?.value != this.form.get('passwordConfirmation')?.value) {
        this.messages.push({ severity: 'warn', detail: "The passwords don't match" });
      }
    }
  }

  changeToRegister() {
    this.visiblePopup.set(false);
    this.visiblePopup.set(true);
    this.messages = [];
    this.visibleRegisterPopup = true;
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
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        } else {
          this._snackBar.open('Logged in', 'Got it!', {
            duration: 5000,
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

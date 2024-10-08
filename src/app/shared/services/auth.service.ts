import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, deleteUser, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, User, UserCredential, verifyBeforeUpdateEmail } from '@angular/fire/auth';

//So we can have it classified
export enum SocialLoginMethods {
  Google = 'google',
  Facebook = 'facebook',
  Github = 'github',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private readonly auth: Auth
  ) {}

  /*=============================================
  =            Traditional email            =
  =============================================*/
  
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  sendVerificationEmail(user: User): Promise<void> {
    return sendEmailVerification(user);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginRegister(email: string, password: string, register?: boolean): Promise<UserCredential> {
    return !register ? signInWithEmailAndPassword(this.auth, email, password) : this.register(email, password);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  updatePassword(user: User, newPassword: string): Promise<void> {
    return updatePassword(user, newPassword);
  }

  updateEmail(user: User, newEmail: string): Promise<void> {
    /* We have to verify first the email before update, the method updateEmail is not the recommended */
    return verifyBeforeUpdateEmail(user, newEmail);
  }

  deleteUser(user: User): Promise<void> {
    return deleteUser(user);
  }
  
  /*=====  Final de Traditional email  ======*/

  socialLogin(socialLoginMethod: SocialLoginMethods): Promise<UserCredential> {
    let authMethod;
    switch(socialLoginMethod) {
      case SocialLoginMethods.Google: {
        authMethod = new GoogleAuthProvider();
        break;
      }
      case SocialLoginMethods.Facebook: {
        authMethod = new FacebookAuthProvider();
        break;
      }
      case SocialLoginMethods.Github: {
        authMethod = new GithubAuthProvider();
        break;
      }
    }
    return signInWithPopup(this.auth, authMethod); //Just import it
  }

  logout(): void {
    signOut(this.auth); // Method to log out with Firebase
    window.sessionStorage.removeItem('auth-user'); // Method to log out in our personal backend if we have (not necessary, but an option for more complex apps)
    window.location.reload();
  }
}

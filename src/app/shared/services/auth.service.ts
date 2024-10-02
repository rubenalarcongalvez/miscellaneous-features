import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential } from '@angular/fire/auth';

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
    private auth: Auth
  ) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginRegister(email: string, password: string, register: boolean = false): Promise<UserCredential> {
    return !register ? signInWithEmailAndPassword(this.auth, email, password) : this.register(email, password); //Just import it
  }

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
    return signInWithPopup(this.auth, authMethod!); //Just import it
  }

  logout(): void {
    signOut(this.auth); // Method to log out with Firebase
    window.sessionStorage.removeItem('auth-user'); // Method to log out in our personal backend if we have (not necessary, but an option for more complex apps)
    window.location.reload();
  }
}

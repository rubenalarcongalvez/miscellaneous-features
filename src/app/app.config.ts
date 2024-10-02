import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({"projectId":"miscellaneous-fts","appId":"1:852596679231:web:5f81bb79603a5bf3de4e8a","storageBucket":"miscellaneous-fts.appspot.com","apiKey":"AIzaSyAAUld5xRhWEU4rt-kw1HPEwJfDFm_-_J8","authDomain":"miscellaneous-fts.firebaseapp.com","messagingSenderId":"852596679231","measurementId":"G-V77J9DYKGG"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};

import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NormalizeStringsComponent } from './views/normalize-strings/normalize-strings.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'normalize-strings', component: NormalizeStringsComponent},
];

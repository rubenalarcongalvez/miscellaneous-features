import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NormalizeStringsComponent } from './views/normalize-strings/normalize-strings.component';
import { PaymentWallComponent } from './views/payment-wall/payment-wall.component';
import { BasicAccordionComponent } from './views/basic-accordion/basic-accordion.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'normalize-strings', component: NormalizeStringsComponent},
    {path: 'payment-wall', component: PaymentWallComponent},
    {path: 'basic-accordion', component: BasicAccordionComponent},
];

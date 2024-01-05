import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NormalizeStringsComponent } from './views/normalize-strings/normalize-strings.component';
import { PaymentWallComponent } from './views/payment-wall/payment-wall.component';
import { BasicAccordionComponent } from './views/basic-accordion/basic-accordion.component';
import { GlassEffectComponent } from './views/glass-effect/glass-effect.component';
import { TransformComponent } from './views/transform/transform.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'normalize-strings', component: NormalizeStringsComponent},
    {path: 'payment-wall', component: PaymentWallComponent},
    {path: 'basic-accordion', component: BasicAccordionComponent},
    {path: 'glass-effect', component: GlassEffectComponent},
    {path: 'transform', component: TransformComponent},
];

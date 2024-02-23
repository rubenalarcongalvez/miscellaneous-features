import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NormalizeStringsComponent } from './views/normalize-strings/normalize-strings.component';
import { PaymentGatewayComponent } from './views/payment-gateway/payment-gateway.component';
import { BasicAccordionComponent } from './views/basic-accordion/basic-accordion.component';
import { GlassEffectComponent } from './views/glass-effect/glass-effect.component';
import { TransformComponent } from './views/transform/transform.component';
import { ClampComponent } from './views/clamp/clamp.component';
import { TextWrapBalanceComponent } from './views/text-wrap-balance/text-wrap-balance.component';
import { EmbedComponent } from './views/embed/embed.component';
import { InputFileComponent } from './views/input-file/input-file.component';
import { ViewportComponent } from './views/viewport/viewport.component';
import { TransitionsComponent } from './views/transitions/transitions.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'normalize-strings', component: NormalizeStringsComponent},
    {path: 'payment-gateway', component: PaymentGatewayComponent},
    {path: 'basic-accordion', component: BasicAccordionComponent},
    {path: 'glass-effect', component: GlassEffectComponent},
    {path: 'transform', component: TransformComponent},
    {path: 'clamp', component: ClampComponent},
    {path: 'text-wrap-balance', component: TextWrapBalanceComponent},
    {path: 'embed', component: EmbedComponent},
    {path: 'input-file', component: InputFileComponent},
    {path: 'viewport', component: ViewportComponent},
    {path: 'transitions', component: TransitionsComponent},

    {path: '**', redirectTo: ''}
];

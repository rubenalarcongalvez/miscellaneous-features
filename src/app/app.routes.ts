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
import { BlurMessageComponent } from './views/blur-message/blur-message.component';
import { CustomCursorComponent } from './views/custom-cursor/custom-cursor.component';
import { BoxShadowVsDropShadowComponent } from './views/box-shadow-vs-drop-shadow/box-shadow-vs-drop-shadow.component';
import { DownloadFilesComponent } from './views/download-files/download-files.component';
import { FieldSizingComponent } from './views/field-sizing/field-sizing.component';
import { TextWithVideoOrImageBackgroundComponent } from './views/text-with-video-or-image-background/text-with-video-or-image-background.component';
import { WordBreakComponent } from './views/word-break/word-break.component';
import { LazyLoadingComponent } from './views/lazy-loading/lazy-loading.component';
import { ContentToComponentComponent } from './views/content-to-component/content-to-component.component';
import { AdsComponent } from './views/ads/ads.component';
import { DisplayAnimationsComponent } from './views/display-animations/display-animations.component';
import { GoogleFacebookOauthComponent } from './views/google-facebook-oauth/google-facebook-oauth.component';
import { FirebaseDatabaseComponent } from './views/firebase-database/firebase-database.component';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { ExportExcelCancelPetitionsComponent } from './views/export-excel-cancel-petitions/export-excel-cancel-petitions.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'payment-gateway', component: PaymentGatewayComponent},
    {path: 'ads', component: AdsComponent},
    {path: 'normalize-strings', component: NormalizeStringsComponent},
    {path: 'basic-accordion', component: BasicAccordionComponent},
    {path: 'glass-effect', component: GlassEffectComponent},
    {path: 'transform', component: TransformComponent},
    {path: 'clamp', component: ClampComponent},
    {path: 'text-wrap-balance', component: TextWrapBalanceComponent},
    {path: 'embed', component: EmbedComponent},
    {path: 'input-file', component: InputFileComponent},
    {path: 'viewport', component: ViewportComponent},
    {path: 'transitions', component: TransitionsComponent},
    {path: 'blur-message', component: BlurMessageComponent},
    {path: 'custom-cursor', component: CustomCursorComponent},
    {path: 'box-shadow-vs-drop-shadow', component: BoxShadowVsDropShadowComponent},
    {path: 'download-files', component: DownloadFilesComponent},
    {path: 'field-sizing', component: FieldSizingComponent},
    {path: 'text-with-video-or-image-background', component: TextWithVideoOrImageBackgroundComponent},
    {path: 'word-break', component: WordBreakComponent},
    {path: 'lazy-loading', component: LazyLoadingComponent},
    {path: 'content-to-component', component: ContentToComponentComponent},
    {path: 'display-animations', component: DisplayAnimationsComponent},
    {path: 'google-facebook-oauth', component: GoogleFacebookOauthComponent},
    {path: 'firebase-database', component: FirebaseDatabaseComponent, ...canActivate(() => redirectUnauthorizedTo('/google-facebook-oauth'))}, //We use Firebase's one in this example, but if we have a more secure backend, or more specific, we should use it
    {path: 'export-excel-cancel-petitions', component: ExportExcelCancelPetitionsComponent},

    {path: '**', redirectTo: ''}
];

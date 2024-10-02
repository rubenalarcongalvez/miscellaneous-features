import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MaterialModule } from '../style/material.module';

@NgModule({
  declarations: [],
  exports: [
    MaterialModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    SelectButtonModule,
    MessagesModule,
    ToastModule,
    ProgressBarModule,
  ]
})
export class StylesModule { }

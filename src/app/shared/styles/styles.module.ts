import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MaterialModule } from '../style/material.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';

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
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
  ]
})
export class StylesModule { }

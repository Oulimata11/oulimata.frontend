import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { ErrorComponent } from './error/error.component';
import { LayoutModule } from 'app/layout/layout.module';


@NgModule({
  declarations: [
    PublicComponent,
    ListLoginComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class PublicModule { }

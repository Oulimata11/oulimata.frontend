import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './public-routing.module';
  import { ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { ListNotFoundComponent } from './not-found/list-not-found/list-not-found.component';
  
  
  @NgModule({
    declarations: [
    PublicComponent,
    ListLoginComponent,
    ListNotFoundComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class PublicModule { }
  
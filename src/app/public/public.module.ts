import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { ErrorComponent } from './error/error.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';


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

   //NgBootstrap
   CoreCommonModule,
   CoreThemeCustomizerModule,
   //NgbModalModule,
   

   /* SampleModule */
   LayoutModule,
   NgbModalModule,
   NgbAccordionModule,
   NgbCollapseModule,
   BreadcrumbModule,
   NgbModule,
  ]
})
export class PublicModule { }

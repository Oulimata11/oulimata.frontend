import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddAbsenceComponent } from './absence/add-absence/add-absence.component';
import { EditAbsenceComponent } from './absence/edit-absence/edit-absence.component';
import { ListAbsenceComponent } from './absence/list-absence/list-absence.component';
import { AddCongesComponent } from './conges/add-conges/add-conges.component';
import { EditCongesComponent } from './conges/edit-conges/edit-conges.component';
import { ListCongesComponent } from './conges/list-conges/list-conges.component';
import { AddGardienComponent } from './gardien/add-gardien/add-gardien.component';
import { EditGardienComponent } from './gardien/edit-gardien/edit-gardien.component';
import { ListGardienComponent } from './gardien/list-gardien/list-gardien.component';
import { AddIndemniteComponent } from './indemnite/add-indemnite/add-indemnite.component';
import { EditIndemniteComponent } from './indemnite/edit-indemnite/edit-indemnite.component';
import { ListIndemniteComponent } from './indemnite/list-indemnite/list-indemnite.component';
import { AddIndemniteGardienComponent } from './indemnite-gardien/add-indemnite-gardien/add-indemnite-gardien.component';
import { EditIndemniteGardienComponent } from './indemnite-gardien/edit-indemnite-gardien/edit-indemnite-gardien.component';
import { ListIndemniteGardienComponent } from './indemnite-gardien/list-indemnite-gardien/list-indemnite-gardien.component';
import { AddLocalisationComponent } from './localisation/add-localisation/add-localisation.component';
import { EditLocalisationComponent } from './localisation/edit-localisation/edit-localisation.component';
import { ListLocalisationComponent } from './localisation/list-localisation/list-localisation.component';
import { AddNoteComponent } from './note/add-note/add-note.component';
import { EditNoteComponent } from './note/edit-note/edit-note.component';
import { ListNoteComponent } from './note/list-note/list-note.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { AddSocieteComponent } from './societe/add-societe/add-societe.component';
import { EditSocieteComponent } from './societe/edit-societe/edit-societe.component';
import { ListSocieteComponent } from './societe/list-societe/list-societe.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { EditUtilisateurComponent } from './utilisateur/edit-utilisateur/edit-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '@angular/flex-layout';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { ProfilUtilisateurComponent } from './utilisateur/profil-utilisateur/profil-utilisateur.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { DetailGardienComponent } from './gardien/detail-gardien/detail-gardien.component';
import { AddGaridenNoteComponent } from './gariden-note/add-gariden-note/add-gariden-note.component';
import { EditGaridenNoteComponent } from './gariden-note/edit-gariden-note/edit-gariden-note.component';
import { ListGaridenNoteComponent } from './gariden-note/list-gariden-note/list-gariden-note.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddAbsenceComponent,
    EditAbsenceComponent,
    ListAbsenceComponent,
    AddCongesComponent,
    EditCongesComponent,
    ListCongesComponent,
    AddGardienComponent,
    EditGardienComponent,
    ListGardienComponent,
    AddIndemniteComponent,
    EditIndemniteComponent,
    ListIndemniteComponent,
    AddIndemniteGardienComponent,
    EditIndemniteGardienComponent,
    ListIndemniteGardienComponent,
    AddLocalisationComponent,
    EditLocalisationComponent,
    ListLocalisationComponent,
    AddNoteComponent,
    EditNoteComponent,
    ListNoteComponent,
    AddRoleComponent,
    EditRoleComponent,
    ListRoleComponent,
    AddSocieteComponent,
    EditSocieteComponent,
    ListSocieteComponent,
    AddUtilisateurComponent,
    EditUtilisateurComponent,
    ListUtilisateurComponent,
    ProfilUtilisateurComponent,
    DetailGardienComponent,
    AddGaridenNoteComponent,
    EditGaridenNoteComponent,
    ListGaridenNoteComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CardSnippetModule,

   //NgBootstrap
   NgbModule,
   CoreCommonModule,
   CoreSidebarModule,
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
export class HomeModule { }

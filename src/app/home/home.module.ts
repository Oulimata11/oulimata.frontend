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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddGardienNoteComponent } from './gardien-note/add-gardien-note/add-gardien-note.component';
import { EditGardienNoteComponent } from './gardien-note/edit-gardien-note/edit-gardien-note.component';
import { ListGardienNoteComponent } from './gardien-note/list-gardien-note/list-gardien-note.component';
import { AddSocieteGardienComponent } from './societe-gardien/add-societe-gardien/add-societe-gardien.component';
import { EditSocieteGardienComponent } from './societe-gardien/edit-societe-gardien/edit-societe-gardien.component';
import { ListSocieteGardienComponent } from './societe-gardien/list-societe-gardien/list-societe-gardien.component';
import { EditProfilUtilisateurComponent } from './utilisateur/profil-utilisateur/edit-profil-utilisateur/edit-profil-utilisateur.component';
import { EditPasswordUtilisateurComponent } from './utilisateur/profil-utilisateur/edit-password-utilisateur/edit-password-utilisateur.component';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TestCalendarComponent } from './test/test-calendar/test-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarEventSidebarComponent } from './test/test-calendar/calendar-sidebar/calendar-event-sidebar/calendar-event-sidebar.component';
import { CalendarMainSidebarComponent } from './test/test-calendar/calendar-sidebar/calendar-main-sidebar/calendar-main-sidebar.component';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

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
    AddGardienNoteComponent,
    EditGardienNoteComponent,
    ListGardienNoteComponent,
    AddSocieteGardienComponent,
    EditSocieteGardienComponent,
    ListSocieteGardienComponent,
    EditProfilUtilisateurComponent,
    EditPasswordUtilisateurComponent,
    DashboardGeneralComponent,
    TestCalendarComponent,
    CalendarEventSidebarComponent,
    CalendarMainSidebarComponent
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
    ContentHeaderModule,
    CardSnippetModule,
    //NgbModalModule,

    FormsModule,
    Ng2SearchPipeModule,
    NgxDatatableModule,
    /* SampleModule */
    LayoutModule,
    NgbModalModule,
    NgbAccordionModule,
    NgbCollapseModule,
    BreadcrumbModule,
    NgbModule,
    FullCalendarModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAbsenceComponent } from './absence/list-absence/list-absence.component';
import { ListCongesComponent } from './conges/list-conges/list-conges.component';
import { ListGardienComponent } from './gardien/list-gardien/list-gardien.component';
import { ListIndemniteComponent } from './indemnite/list-indemnite/list-indemnite.component';
import { ListIndemniteGardienComponent } from './indemnite-gardien/list-indemnite-gardien/list-indemnite-gardien.component';
import { ListLocalisationComponent } from './localisation/list-localisation/list-localisation.component';
import { ListNoteComponent } from './note/list-note/list-note.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { ListSocieteComponent } from './societe/list-societe/list-societe.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { ProfilUtilisateurComponent } from './utilisateur/profil-utilisateur/profil-utilisateur.component';
import { ListGardienNoteComponent } from './gardien-note/list-gardien-note/list-gardien-note.component';
import { ListSocieteGardienComponent } from './societe-gardien/list-societe-gardien/list-societe-gardien.component';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { UserGuard } from './utilisateur/controleur/user.guard';
import { AbsenceGuard } from './absence/controleur/absence.guard';
import { NoteGuard } from './note/controleur/note.guard';
import { AffectationGuard } from './societe-gardien/controleur/affectation.guard';
import { IndemniteGardienGuard } from './indemnite-gardien/controleur/indemnite-gardien.guard';
import { GardienGuard } from './gardien/controleur/gardien.guard';
import { CongesGuard } from './conges/controleur/conges.guard';
import { SocieteGuard } from './societe/controleur/societe.guard';
import { TestCalendarComponent } from './test/test-calendar/test-calendar.component';

const routes: Routes = [
  { path: "", component: ListGardienComponent },
  { path: "absence", component: ListAbsenceComponent, canActivate: [AbsenceGuard] },
  { path: "conges", component: ListCongesComponent, canActivate: [CongesGuard] },
  { path: "gardien", component: ListGardienComponent, canActivate: [GardienGuard] },
  { path: "indemnite", component: ListIndemniteGardienComponent, canActivate: [IndemniteGardienGuard] },
  { path: "societe_gardien", component: ListSocieteGardienComponent, canActivate: [AffectationGuard] },
  // { path: "localisation", component: ListLocalisationComponent },
  { path: "evaluation", component: ListNoteComponent, canActivate: [NoteGuard] },
  { path: "role", component: ListRoleComponent },
  { path: "societe", component: ListSocieteComponent, canActivate: [SocieteGuard] },
  //utilisateur
  { path: "utilisateur", component: ListUtilisateurComponent, canActivate: [UserGuard] },
  { path: "utilisateur/profil", component: ProfilUtilisateurComponent },

  { path: "test/calendar", component: TestCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
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

const routes: Routes = [
  { path: "", component: DashboardGeneralComponent },
  { path: "absence", component: ListAbsenceComponent },
  { path: "conges", component: ListCongesComponent },
  { path: "gardien", component: ListGardienComponent },
  { path: "indemnite", component: ListIndemniteGardienComponent },
  { path: "societe_gardien", component: ListSocieteGardienComponent},
  { path: "localisation", component: ListLocalisationComponent },
  { path: "evaluation", component: ListNoteComponent },
  { path: "role", component: ListRoleComponent },
  { path: "societe", component: ListSocieteComponent },
  //utilisateur
  { path: "utilisateur", component: ListUtilisateurComponent },
  { path: "utilisateur/profil", component: ProfilUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
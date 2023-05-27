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

const routes: Routes = [
  { path: "", component: ListUtilisateurComponent },
  { path: "absence", component: ListAbsenceComponent },
  { path: "conges", component: ListCongesComponent },
  { path: "gardien", component: ListGardienComponent },
  { path: "indemnite", component: ListIndemniteComponent },
  { path: "indemnite_gardien", component: ListIndemniteGardienComponent },
  { path: "localisation", component: ListLocalisationComponent },
  { path: "note", component: ListNoteComponent },
  { path: "role", component: ListRoleComponent },
  { path: "societe", component: ListSocieteComponent },
  { path: "utilisateur", component: ListUtilisateurComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
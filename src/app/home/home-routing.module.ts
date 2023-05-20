import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { ListDeconnexionComponent } from './deconnexion/list-deconnexion/list-deconnexion.component';
import { ListNotFoundComponent } from './not-found/list-not-found/list-not-found.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';

const routes: Routes = [
  {path:"",component:ListAgentComponent},
{path:"agent",component:ListAgentComponent},
{path:"deconnexion",component:ListDeconnexionComponent},
{path:"**",component:ListNotFoundComponent},
{path:"client",component:ListClientComponent},
{path:"fournisseur",component:ListFournisseurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
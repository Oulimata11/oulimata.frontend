import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './home-routing.module';
  import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { ListDeconnexionComponent } from './deconnexion/list-deconnexion/list-deconnexion.component';
import { ListNotFoundComponent } from './not-found/list-not-found/list-not-found.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { EditFournisseurComponent } from './fournisseur/edit-fournisseur/edit-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
  
  
  @NgModule({
    declarations: [
    HomeComponent,
    AddAgentComponent,
    EditAgentComponent,
    ListAgentComponent,
    ListDeconnexionComponent,
    ListNotFoundComponent,
    AddClientComponent,
    EditClientComponent,
    ListClientComponent,
    AddFournisseurComponent,
    EditFournisseurComponent,
    ListFournisseurComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class HomeModule { }
  
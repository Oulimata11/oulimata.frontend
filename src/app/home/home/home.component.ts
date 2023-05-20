import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Agent",path:"/home/agent"},
{libelle:"Deconnexion",path:"/home/deconnexion"},
{libelle:"NotFound",path:"/home/not_found"},
{libelle:"Client",path:"/home/client"},
{libelle:"Fournisseur",path:"/home/fournisseur"}
    ]
  }
}

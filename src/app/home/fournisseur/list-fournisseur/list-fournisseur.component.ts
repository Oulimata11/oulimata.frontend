import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent {
  loading_get_fournisseur = false
  les_fournisseurs: any[] = []
  selected_fournisseur: any = undefined
  fournisseur_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_fournisseur()
  }
  get_fournisseur() {
    this.loading_get_fournisseur = true;
    this.api.taf_post("fournisseur/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_fournisseurs = reponse.data
        console.log("Opération effectuée avec succés sur la table fournisseur. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table fournisseur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_fournisseur = false;
    }, (error: any) => {
      this.loading_get_fournisseur = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_fournisseurs.unshift(event.fournisseur)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_fournisseurs[this.les_fournisseurs.indexOf(this.fournisseur_to_edit)]=params.new_data
  }
  voir_plus(one_fournisseur: any) {
    this.selected_fournisseur = one_fournisseur
  }
  on_click_edit(one_fournisseur: any) {
    this.fournisseur_to_edit = one_fournisseur
  }
  on_close_modal_edit(){
    this.fournisseur_to_edit=undefined
  }
}
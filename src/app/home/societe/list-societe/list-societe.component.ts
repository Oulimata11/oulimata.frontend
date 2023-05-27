import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-societe',
  templateUrl: './list-societe.component.html',
  styleUrls: ['./list-societe.component.scss']
})
export class ListSocieteComponent {
  loading_get_societe = false
  les_societes: any[] = []
  selected_societe: any = undefined
  societe_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_societe()
  }
  get_societe() {
    this.loading_get_societe = true;
    this.api.taf_post("societe/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_societes = reponse.data
        console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_societe = false;
    }, (error: any) => {
      this.loading_get_societe = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_societes.unshift(event.societe)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_societes[this.les_societes.indexOf(this.societe_to_edit)]=params.new_data
  }
  voir_plus(one_societe: any) {
    this.selected_societe = one_societe
  }
  on_click_edit(one_societe: any) {
    this.societe_to_edit = one_societe
  }
  on_close_modal_edit(){
    this.societe_to_edit=undefined
  }
}
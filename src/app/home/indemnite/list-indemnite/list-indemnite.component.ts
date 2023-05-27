import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-indemnite',
  templateUrl: './list-indemnite.component.html',
  styleUrls: ['./list-indemnite.component.scss']
})
export class ListIndemniteComponent {
  loading_get_indemnite = false
  les_indemnites: any[] = []
  selected_indemnite: any = undefined
  indemnite_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_indemnite()
  }
  get_indemnite() {
    this.loading_get_indemnite = true;
    this.api.taf_post("indemnite/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_indemnites = reponse.data
        console.log("Opération effectuée avec succés sur la table indemnite. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table indemnite a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_indemnite = false;
    }, (error: any) => {
      this.loading_get_indemnite = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_indemnites.unshift(event.indemnite)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_indemnites[this.les_indemnites.indexOf(this.indemnite_to_edit)]=params.new_data
  }
  voir_plus(one_indemnite: any) {
    this.selected_indemnite = one_indemnite
  }
  on_click_edit(one_indemnite: any) {
    this.indemnite_to_edit = one_indemnite
  }
  on_close_modal_edit(){
    this.indemnite_to_edit=undefined
  }
}
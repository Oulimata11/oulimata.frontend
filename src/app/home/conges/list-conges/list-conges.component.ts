import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-conges',
  templateUrl: './list-conges.component.html',
  styleUrls: ['./list-conges.component.scss']
})
export class ListCongesComponent {
  loading_get_conges = false
  les_congess: any[] = []
  selected_conges: any = undefined
  conges_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_conges()
  }
  get_conges() {
    this.loading_get_conges = true;
    this.api.taf_post("conges/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_congess = reponse.data
        console.log("Opération effectuée avec succés sur la table conges. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table conges a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_conges = false;
    }, (error: any) => {
      this.loading_get_conges = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_congess.unshift(event.conges)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_congess[this.les_congess.indexOf(this.conges_to_edit)]=params.new_data
  }
  voir_plus(one_conges: any) {
    this.selected_conges = one_conges
  }
  on_click_edit(one_conges: any) {
    this.conges_to_edit = one_conges
  }
  on_close_modal_edit(){
    this.conges_to_edit=undefined
  }
}
import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-localisation',
  templateUrl: './list-localisation.component.html',
  styleUrls: ['./list-localisation.component.scss']
})
export class ListLocalisationComponent {
  loading_get_localisation = false
  les_localisations: any[] = []
  selected_localisation: any = undefined
  localisation_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_localisation()
  }
  get_localisation() {
    this.loading_get_localisation = true;
    this.api.taf_post("localisation/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_localisations = reponse.data
        console.log("Opération effectuée avec succés sur la table localisation. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table localisation a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_localisation = false;
    }, (error: any) => {
      this.loading_get_localisation = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_localisations.unshift(event.localisation)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_localisations[this.les_localisations.indexOf(this.localisation_to_edit)]=params.new_data
  }
  voir_plus(one_localisation: any) {
    this.selected_localisation = one_localisation
  }
  on_click_edit(one_localisation: any) {
    this.localisation_to_edit = one_localisation
  }
  on_close_modal_edit(){
    this.localisation_to_edit=undefined
  }
}
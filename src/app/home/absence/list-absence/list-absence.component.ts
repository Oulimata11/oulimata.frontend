import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss']
})
export class ListAbsenceComponent {
  loading_get_absence = false
  les_absences: any[] = []
  selected_absence: any = undefined
  absence_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_absence()
  }
  get_absence() {
    this.loading_get_absence = true;
    this.api.taf_post("absence/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_absences = reponse.data
        console.log("Opération effectuée avec succés sur la table absence. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table absence a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_absence = false;
    }, (error: any) => {
      this.loading_get_absence = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_absences.unshift(event.absence)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_absences[this.les_absences.indexOf(this.absence_to_edit)]=params.new_data
  }
  voir_plus(one_absence: any) {
    this.selected_absence = one_absence
  }
  on_click_edit(one_absence: any) {
    this.absence_to_edit = one_absence
  }
  on_close_modal_edit(){
    this.absence_to_edit=undefined
  }
}
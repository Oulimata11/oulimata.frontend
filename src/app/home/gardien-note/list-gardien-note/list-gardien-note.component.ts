import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-gardien-note',
  templateUrl: './list-gardien-note.component.html',
  styleUrls: ['./list-gardien-note.component.scss']
})
export class ListGardienNoteComponent {
  loading_get_gardien_note = false
  les_gardien_notes: any[] = []
  selected_gardien_note: any = undefined
  gardien_note_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_gardien_note()
  }
  get_gardien_note() {
    this.loading_get_gardien_note = true;
    this.api.taf_post("gardien_note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardien_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table gardien_note. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table gardien_note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien_note = false;
    }, (error: any) => {
      this.loading_get_gardien_note = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_gardien_notes.unshift(event.gardien_note)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_gardien_notes[this.les_gardien_notes.indexOf(this.gardien_note_to_edit)]=params.new_data
  }
  voir_plus(one_gardien_note: any) {
    this.selected_gardien_note = one_gardien_note
  }
  on_click_edit(one_gardien_note: any) {
    this.gardien_note_to_edit = one_gardien_note
  }
  on_close_modal_edit(){
    this.gardien_note_to_edit=undefined
  }
}
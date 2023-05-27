import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.scss']
})
export class ListNoteComponent {
  loading_get_note = false
  les_notes: any[] = []
  selected_note: any = undefined
  note_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_note()
  }
  get_note() {
    this.loading_get_note = true;
    this.api.taf_post("note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_note = false;
    }, (error: any) => {
      this.loading_get_note = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_notes.unshift(event.note)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_notes[this.les_notes.indexOf(this.note_to_edit)]=params.new_data
  }
  voir_plus(one_note: any) {
    this.selected_note = one_note
  }
  on_click_edit(one_note: any) {
    this.note_to_edit = one_note
  }
  on_close_modal_edit(){
    this.note_to_edit=undefined
  }
}
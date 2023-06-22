import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-list-gariden-note',
  templateUrl: './list-gariden-note.component.html',
  styleUrls: ['./list-gariden-note.component.css']
})
export class ListGaridenNoteComponent {
  loading_get_gariden_note = false
  les_gariden_notes: any[] = []
  selected_gariden_note: any = undefined
  gariden_note_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_gariden_note()
  }
  get_gariden_note() {
    this.loading_get_gariden_note = true;
    this.api.taf_post("gariden_note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gariden_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table gariden_note. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table gariden_note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gariden_note = false;
    }, (error: any) => {
      this.loading_get_gariden_note = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_gariden_notes.unshift(event.gariden_note)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_gariden_notes[this.les_gariden_notes.indexOf(this.gariden_note_to_edit)]=params.new_data
  }
  voir_plus(one_gariden_note: any) {
    this.selected_gariden_note = one_gariden_note
  }
  on_click_edit(one_gariden_note: any) {
    this.gariden_note_to_edit = one_gariden_note
  }
  on_close_modal_edit(){
    this.gariden_note_to_edit=undefined
  }
}
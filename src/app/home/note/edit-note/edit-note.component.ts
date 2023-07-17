
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
  reactiveForm_edit_note !: FormGroup;
  submitted: boolean = false
  loading_edit_note: boolean = false
  loading_get_gardien = false
  les_gardiens: any[] = []
    @Input()
  note_to_edit: any = {}
  @Output()
  cb_edit_note=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) {}
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.note_to_edit)
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_edit_note  = this.formBuilder.group({
        id_gardien: ["", Validators.required],
        note: ["", Validators.required],
        commentaire: [""],
      });
  }
  // mise à jour du formulaire
  update_form(note_to_edit:any) {
      this.reactiveForm_edit_note = this.formBuilder.group({     
        id_gardien: [note_to_edit.id_gardien, Validators.required],
        note: [note_to_edit.note, Validators.required],
        commentaire: [note_to_edit.commentaire],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_note .controls; }
  // validation du formulaire
  onSubmit_edit_note() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_note.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_note.invalid) {
          return;
      }
      if(!this.check_change()){
        alert("Il n'y a pas eu de changement");
        return;
      }
      var note = this.reactiveForm_edit_note.value
      this.edit_note({
      condition:JSON.stringify({id_note:this.note_to_edit.id_note}),
      data:JSON.stringify(note)
      })
  }
  // vider le formulaire
  onReset_edit_note() {
      this.submitted = false;
      this.reactiveForm_edit_note.reset();
  }
  edit_note(note: any) {
      this.loading_edit_note = true;
      this.api.taf_post("note/edit", note, (reponse: any) => {
        this.loading_edit_note = false;
          if (reponse.status) {
              this.cb_edit_note.emit({new_data:JSON.parse(note.data)})
              console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
              this.onReset_edit_note()
              this.api.Swal_success("Note modifiée avec succés")
          } else {
              console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
      }, (error: any) => {
          this.loading_edit_note = false;
      })
  }
  //liste des gerdiens 
 get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens = reponse.data
        this.les_gardiens=this.les_gardiens.map(gardien => {
          var statut= gardien.statut_gardien == 1 ? "Actif" : "Inactif";
          var affectation =gardien.id_societe == null ? "Pas Affecté" : "Affecté"
          return {...gardien,statut,affectation}
        })
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }
//determiner s'il y'a chagement au niveau du formulaire ou pas 
    check_change() : boolean {
    // retourne true s'il y'a changement et false sinon
    for (const [key, value] of Object.entries(this.reactiveForm_edit_note.value)) {
        if (this.note_to_edit[key] != value) {
        // il y'a eu un changement
        return true;
        }
    }
        return false;
    }
}


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-gardien-note',
  templateUrl: './edit-gardien-note.component.html',
  styleUrls: ['./edit-gardien-note.component.scss']
})
export class EditGardienNoteComponent {
  reactiveForm_edit_gardien_note !: FormGroup;
  submitted: boolean = false
  loading_edit_gardien_note: boolean = false
  loading_get_note = false
  les_notes: any[] = []
  loading_get_gardien = false
  les_gardiens: any[] = []
  hasChange :boolean = false
  @Input()
  gardien_note_to_edit: any = {}
  @Output()
  cb_edit_gardien_note=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.gardien_note_to_edit)
      this.get_note()
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_edit_gardien_note  = this.formBuilder.group({
    id_gardien: ["", Validators.required],
    id_note: ["", Validators.required],
    date_note: ["", Validators.required],
    commentaire: ["", Validators.required],
      });
  }
  // mise à jour du formulaire
  update_form(gardien_note_to_edit:any) {
    this.reactiveForm_edit_gardien_note = this.formBuilder.group({
    id_gardien: [gardien_note_to_edit.id_gardien, Validators.required],
    id_note: [gardien_note_to_edit.id_note, Validators.required],
    date_note: [gardien_note_to_edit.date_note, Validators.required],
    commentaire: [gardien_note_to_edit.commentaire, Validators.required],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_gardien_note .controls; }
  // validation du formulaire
  onSubmit_edit_gardien_note() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_gardien_note.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_gardien_note.invalid) {
          return;
      }
      this.hasChange= this.api.check_change(this.reactiveForm_edit_gardien_note.value,this.gardien_note_to_edit)
      if(!this.hasChange){
        alert("Il n'y a pas eu de changement");
        return;
      }
      var gardien_note = this.reactiveForm_edit_gardien_note.value
      this.edit_gardien_note({
      condition:JSON.stringify({id_gardien_note:this.gardien_note_to_edit.id_gardien_note}),
      data:JSON.stringify(gardien_note)
      })
  }
  // vider le formulaire
  onReset_edit_gardien_note() {
      this.submitted = false;
      this.reactiveForm_edit_gardien_note.reset();
  }
  edit_gardien_note(gardien_note: any) {
      this.loading_edit_gardien_note = true;
      this.api.taf_post("gardien_note/edit", gardien_note, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_gardien_note.emit({
                  new_data:JSON.parse(gardien_note.data)
              })
              console.log("Opération effectuée avec succés sur la table gardien_note. Réponse= ", reponse);
              this.onReset_edit_gardien_note()
              alert("Opération effectuée avec succés sur la table gardien_note")
          } else {
              console.log("L'opération sur la table gardien_note a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_gardien_note = false;
      }, (error: any) => {
          this.loading_edit_gardien_note = false;
      })
  }
   //liste des notes disponibles
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
}

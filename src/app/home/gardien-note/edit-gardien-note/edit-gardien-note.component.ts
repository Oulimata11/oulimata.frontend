
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
  @Input()
  gardien_note_to_edit: any = {}
  @Output()
  cb_edit_gardien_note=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.gardien_note_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_gardien_note  = this.formBuilder.group({
        id_gardien_note: ["", Validators.required],
id_gardien: ["", Validators.required],
id_note: ["", Validators.required],
date_note: ["", Validators.required],
commentaire: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(gardien_note_to_edit:any) {
      this.reactiveForm_edit_gardien_note = this.formBuilder.group({
          id_gardien_note: [gardien_note_to_edit.id_gardien_note, Validators.required],
id_gardien: [gardien_note_to_edit.id_gardien, Validators.required],
id_note: [gardien_note_to_edit.id_note, Validators.required],
date_note: [gardien_note_to_edit.date_note, Validators.required],
commentaire: [gardien_note_to_edit.commentaire, Validators.required],
created_at: [gardien_note_to_edit.created_at, Validators.required],
updated_at: [gardien_note_to_edit.updated_at, Validators.required]
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
}

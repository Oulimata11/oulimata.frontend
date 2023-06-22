
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
  @Input()
  note_to_edit: any = {}
  @Output()
  cb_edit_note=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.note_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_note  = this.formBuilder.group({
        id_note: ["", Validators.required],
note: ["", Validators.required],
description_note: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(note_to_edit:any) {
      this.reactiveForm_edit_note = this.formBuilder.group({
          id_note: [note_to_edit.id_note, Validators.required],
note: [note_to_edit.note, Validators.required],
description_note: [note_to_edit.description_note, Validators.required],
created_at: [note_to_edit.created_at, Validators.required],
updated_at: [note_to_edit.updated_at, Validators.required]
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
          if (reponse.status) {
              this.cb_edit_note.emit({
                  new_data:JSON.parse(note.data)
              })
              console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
              this.onReset_edit_note()
              alert("Opération effectuée avec succés sur la table note")
          } else {
              console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_note = false;
      }, (error: any) => {
          this.loading_edit_note = false;
      })
  }
}

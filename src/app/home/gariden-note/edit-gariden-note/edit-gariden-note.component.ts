
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-edit-gariden-note',
  templateUrl: './edit-gariden-note.component.html',
  styleUrls: ['./edit-gariden-note.component.css']
})
export class EditGaridenNoteComponent {
  reactiveForm_edit_gariden_note !: FormGroup;
  submitted: boolean = false
  loading_edit_gariden_note: boolean = false
  @Input()
  gariden_note_to_edit: any = {}
  @Output()
  cb_edit_gariden_note=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.gariden_note_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_gariden_note  = this.formBuilder.group({
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
  update_form(gariden_note_to_edit:any) {
      this.reactiveForm_edit_gariden_note = this.formBuilder.group({
          id_gardien_note: [gariden_note_to_edit.id_gardien_note, Validators.required],
id_gardien: [gariden_note_to_edit.id_gardien, Validators.required],
id_note: [gariden_note_to_edit.id_note, Validators.required],
date_note: [gariden_note_to_edit.date_note, Validators.required],
commentaire: [gariden_note_to_edit.commentaire, Validators.required],
created_at: [gariden_note_to_edit.created_at, Validators.required],
updated_at: [gariden_note_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_gariden_note .controls; }
  // validation du formulaire
  onSubmit_edit_gariden_note() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_gariden_note.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_gariden_note.invalid) {
          return;
      }
      var gariden_note = this.reactiveForm_edit_gariden_note.value
      this.edit_gariden_note({
      condition:JSON.stringify({id_gariden_note:this.gariden_note_to_edit.id_gariden_note}),
      data:JSON.stringify(gariden_note)
      })
  }
  // vider le formulaire
  onReset_edit_gariden_note() {
      this.submitted = false;
      this.reactiveForm_edit_gariden_note.reset();
  }
  edit_gariden_note(gariden_note: any) {
      this.loading_edit_gariden_note = true;
      this.api.taf_post("gariden_note/edit", gariden_note, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_gariden_note.emit({
                  new_data:JSON.parse(gariden_note.data)
              })
              console.log("Opération effectuée avec succés sur la table gariden_note. Réponse= ", reponse);
              this.onReset_edit_gariden_note()
              alert("Opération effectuée avec succés sur la table gariden_note")
          } else {
              console.log("L'opération sur la table gariden_note a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_gariden_note = false;
      }, (error: any) => {
          this.loading_edit_gariden_note = false;
      })
  }
}

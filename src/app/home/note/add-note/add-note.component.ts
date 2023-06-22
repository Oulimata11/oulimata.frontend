
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  @Output()
  cb_add_note=new EventEmitter()
  reactiveForm_add_note !: FormGroup;
  submitted:boolean=false
  loading_add_note :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_note  = this.formBuilder.group({
          id_note: ["", Validators.required],
note: ["", Validators.required],
description_note: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_note .controls; }
  // validation du formulaire
  onSubmit_add_note () {
      this.submitted = true;
      console.log(this.reactiveForm_add_note .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_note .invalid) {
          return;
      }
      var note =this.reactiveForm_add_note .value
      this.add_note (note )
  }
  // vider le formulaire
  onReset_add_note () {
      this.submitted = false;
      this.reactiveForm_add_note .reset();
  }
  add_note(note: any) {
      this.loading_add_note = true;
      this.api.taf_post("note/add", note, (reponse: any) => {
      this.loading_add_note = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
          this.onReset_add_note()
          alert("Opération éffectuée avec succés")
          this.cb_add_note.emit({
            status:true,
            note:reponse.data
          })
      } else {
          console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_note = false;
    })
  }
  
}

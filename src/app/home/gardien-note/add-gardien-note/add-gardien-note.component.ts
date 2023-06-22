
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-gardien-note',
  templateUrl: './add-gardien-note.component.html',
  styleUrls: ['./add-gardien-note.component.scss']
})
export class AddGardienNoteComponent {
  @Output()
  cb_add_gardien_note=new EventEmitter()
  reactiveForm_add_gardien_note !: FormGroup;
  submitted:boolean=false
  loading_add_gardien_note :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_gardien_note  = this.formBuilder.group({
          id_gardien_note: ["", Validators.required],
id_gardien: ["", Validators.required],
id_note: ["", Validators.required],
date_note: ["", Validators.required],
commentaire: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_gardien_note .controls; }
  // validation du formulaire
  onSubmit_add_gardien_note () {
      this.submitted = true;
      console.log(this.reactiveForm_add_gardien_note .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_gardien_note .invalid) {
          return;
      }
      var gardien_note =this.reactiveForm_add_gardien_note .value
      this.add_gardien_note (gardien_note )
  }
  // vider le formulaire
  onReset_add_gardien_note () {
      this.submitted = false;
      this.reactiveForm_add_gardien_note .reset();
  }
  add_gardien_note(gardien_note: any) {
      this.loading_add_gardien_note = true;
      this.api.taf_post("gardien_note/add", gardien_note, (reponse: any) => {
      this.loading_add_gardien_note = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table gardien_note. Réponse= ", reponse);
          this.onReset_add_gardien_note()
          alert("Opération éffectuée avec succés")
          this.cb_add_gardien_note.emit({
            status:true,
            gardien_note:reponse.data
          })
      } else {
          console.log("L'opération sur la table gardien_note a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_gardien_note = false;
    })
  }
  
}

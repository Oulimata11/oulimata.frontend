
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-add-gariden-note',
  templateUrl: './add-gariden-note.component.html',
  styleUrls: ['./add-gariden-note.component.css']
})
export class AddGaridenNoteComponent {
  @Output()
  cb_add_gariden_note=new EventEmitter()
  reactiveForm_add_gariden_note !: FormGroup;
  submitted:boolean=false
  loading_add_gariden_note :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_gariden_note  = this.formBuilder.group({
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
  get f(): any { return this.reactiveForm_add_gariden_note .controls; }
  // validation du formulaire
  onSubmit_add_gariden_note () {
      this.submitted = true;
      console.log(this.reactiveForm_add_gariden_note .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_gariden_note .invalid) {
          return;
      }
      var gariden_note =this.reactiveForm_add_gariden_note .value
      this.add_gariden_note (gariden_note )
  }
  // vider le formulaire
  onReset_add_gariden_note () {
      this.submitted = false;
      this.reactiveForm_add_gariden_note .reset();
  }
  add_gariden_note(gariden_note: any) {
      this.loading_add_gariden_note = true;
      this.api.taf_post("gariden_note/add", gariden_note, (reponse: any) => {
      this.loading_add_gariden_note = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table gariden_note. Réponse= ", reponse);
          this.onReset_add_gariden_note()
          alert("Opération éffectuée avec succés")
          this.cb_add_gariden_note.emit({
            status:true,
            gariden_note:reponse.data
          })
      } else {
          console.log("L'opération sur la table gariden_note a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_gariden_note = false;
    })
  }
  
}

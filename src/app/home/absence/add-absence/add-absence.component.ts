
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss']
})
export class AddAbsenceComponent {
  @Output()
  cb_add_absence=new EventEmitter()
  reactiveForm_add_absence !: FormGroup;
  submitted:boolean=false
  loading_add_absence :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_absence  = this.formBuilder.group({
          id_absence: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_gardien: ["", Validators.required],
date_absence: ["", Validators.required],
raison_absence: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_absence .controls; }
  // validation du formulaire
  onSubmit_add_absence () {
      this.submitted = true;
      console.log(this.reactiveForm_add_absence .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_absence .invalid) {
          return;
      }
      var absence =this.reactiveForm_add_absence .value
      this.add_absence (absence )
  }
  // vider le formulaire
  onReset_add_absence () {
      this.submitted = false;
      this.reactiveForm_add_absence .reset();
  }
  add_absence(absence: any) {
      this.loading_add_absence = true;
      this.api.taf_post("absence/add", absence, (reponse: any) => {
      this.loading_add_absence = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table absence. Réponse= ", reponse);
          this.onReset_add_absence()
          alert("Opération éffectuée avec succés")
          this.cb_add_absence.emit({
            status:true,
            absence:reponse.data
          })
      } else {
          console.log("L'opération sur la table absence a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_absence = false;
    })
  }
  
}

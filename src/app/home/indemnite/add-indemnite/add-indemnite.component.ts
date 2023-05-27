
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-indemnite',
  templateUrl: './add-indemnite.component.html',
  styleUrls: ['./add-indemnite.component.scss']
})
export class AddIndemniteComponent {
  @Output()
  cb_add_indemnite=new EventEmitter()
  reactiveForm_add_indemnite !: FormGroup;
  submitted:boolean=false
  loading_add_indemnite :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_indemnite  = this.formBuilder.group({
          id_indemnite: ["", Validators.required],
id_utilisateur: ["", Validators.required],
date_indemnite: ["", Validators.required],
nature_indemnite: ["", Validators.required],
montant_indemnite: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_indemnite .controls; }
  // validation du formulaire
  onSubmit_add_indemnite () {
      this.submitted = true;
      console.log(this.reactiveForm_add_indemnite .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_indemnite .invalid) {
          return;
      }
      var indemnite =this.reactiveForm_add_indemnite .value
      this.add_indemnite (indemnite )
  }
  // vider le formulaire
  onReset_add_indemnite () {
      this.submitted = false;
      this.reactiveForm_add_indemnite .reset();
  }
  add_indemnite(indemnite: any) {
      this.loading_add_indemnite = true;
      this.api.taf_post("indemnite/add", indemnite, (reponse: any) => {
      this.loading_add_indemnite = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table indemnite. Réponse= ", reponse);
          this.onReset_add_indemnite()
          alert("Opération éffectuée avec succés")
          this.cb_add_indemnite.emit({
            status:true,
            indemnite:reponse.data
          })
      } else {
          console.log("L'opération sur la table indemnite a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_indemnite = false;
    })
  }
  
}

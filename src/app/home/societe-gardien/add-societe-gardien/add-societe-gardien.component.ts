
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-societe-gardien',
  templateUrl: './add-societe-gardien.component.html',
  styleUrls: ['./add-societe-gardien.component.scss']
})
export class AddSocieteGardienComponent {
  @Output()
  cb_add_societe_gardien=new EventEmitter()
  reactiveForm_add_societe_gardien !: FormGroup;
  submitted:boolean=false
  loading_add_societe_gardien :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_societe_gardien  = this.formBuilder.group({
          id_societe_gardien: ["", Validators.required],
id_societe: ["", Validators.required],
id_gardien: ["", Validators.required],
date_affectation: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_societe_gardien .controls; }
  // validation du formulaire
  onSubmit_add_societe_gardien () {
      this.submitted = true;
      console.log(this.reactiveForm_add_societe_gardien .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_societe_gardien .invalid) {
          return;
      }
      var societe_gardien =this.reactiveForm_add_societe_gardien .value
      this.add_societe_gardien (societe_gardien )
  }
  // vider le formulaire
  onReset_add_societe_gardien () {
      this.submitted = false;
      this.reactiveForm_add_societe_gardien .reset();
  }
  add_societe_gardien(societe_gardien: any) {
      this.loading_add_societe_gardien = true;
      this.api.taf_post("societe_gardien/add", societe_gardien, (reponse: any) => {
      this.loading_add_societe_gardien = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table societe_gardien. Réponse= ", reponse);
          this.onReset_add_societe_gardien()
          alert("Opération éffectuée avec succés")
          this.cb_add_societe_gardien.emit({
            status:true,
            societe_gardien:reponse.data
          })
      } else {
          console.log("L'opération sur la table societe_gardien a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_societe_gardien = false;
    })
  }
  
}

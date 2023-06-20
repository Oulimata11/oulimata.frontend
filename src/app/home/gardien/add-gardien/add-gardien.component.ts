
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-gardien',
  templateUrl: './add-gardien.component.html',
  styleUrls: ['./add-gardien.component.scss']
})
export class AddGardienComponent {
  @Output()
  cb_add_gardien=new EventEmitter()
  reactiveForm_add_gardien !: FormGroup;
  submitted:boolean=false
  loading_add_gardien :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
    this.reactiveForm_add_gardien  = this.formBuilder.group({      
    id_utilisateur: [this.api.token.token_decoded.taf_data.id_utilisateur],
    nom_gardien: ["", Validators.required],
    prenom_gardien: ["", Validators.required],
    date_naissance_gardien: ["", Validators.required],
    lieu_naissance_gardien: ["", Validators.required],
    date_insertion_gardien: ["", Validators.required],
    telephone_gardien: ["", Validators.required],
    email_gardien: ["", Validators.required],
        });
}

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_gardien .controls; }
  // validation du formulaire
  onSubmit_add_gardien () {
      this.submitted = true;
      console.log(this.reactiveForm_add_gardien .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_gardien .invalid) {
          return;
      }
      var gardien =this.reactiveForm_add_gardien .value
      this.add_gardien (gardien )
  }
  // vider le formulaire
  onReset_add_gardien () {
      this.submitted = false;
      this.reactiveForm_add_gardien .reset();
  }
  add_gardien(gardien: any) {
      this.loading_add_gardien = true;
      this.api.taf_post("gardien/add", gardien, (reponse: any) => {
      this.loading_add_gardien = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", reponse);
          this.onReset_add_gardien()
          this.api.Swal_success("Gardien ajouté avec succés")
          this.cb_add_gardien.emit({
            status:true,
            gardien:reponse.data
          })
      } else {
          console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_gardien = false;
    })
  }
  
}

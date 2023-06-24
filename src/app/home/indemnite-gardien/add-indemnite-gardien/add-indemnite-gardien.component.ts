
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-indemnite-gardien',
  templateUrl: './add-indemnite-gardien.component.html',
  styleUrls: ['./add-indemnite-gardien.component.scss']
})
export class AddIndemniteGardienComponent {
  @Output()
  cb_add_indemnite_gardien=new EventEmitter()
  reactiveForm_add_indemnite_gardien !: FormGroup;
  submitted:boolean=false
  loading_add_indemnite_gardien :boolean=false
  //gardien
  loading_get_gardien = false
  les_gardiens: any[] = []
    //indemnite
    loading_get_indemnite = false
    les_indemnites: any[] = [] 
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_gardien()
      this.get_indemnite()
  }
  init_form() {
    this.reactiveForm_add_indemnite_gardien  = this.formBuilder.group({     
    id_indemnite: ["", Validators.required],
    id_gardien: ["", Validators.required],
    montant_indemnite: ["", Validators.required],
    date_indemnite: ["", Validators.required],
    });
}

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_indemnite_gardien .controls; }
  // validation du formulaire
  onSubmit_add_indemnite_gardien () {
      this.submitted = true;
      console.log(this.reactiveForm_add_indemnite_gardien .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_indemnite_gardien .invalid) {
          return;
      }
      var indemnite_gardien =this.reactiveForm_add_indemnite_gardien .value
      this.add_indemnite_gardien (indemnite_gardien )
  }
  // vider le formulaire
  onReset_add_indemnite_gardien () {
      this.submitted = false;
      this.reactiveForm_add_indemnite_gardien .reset();
  }
  add_indemnite_gardien(indemnite_gardien: any) {
      this.loading_add_indemnite_gardien = true;
      this.api.taf_post("indemnite_gardien/add", indemnite_gardien, (reponse: any) => {
      this.loading_add_indemnite_gardien = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table indemnite_gardien. Réponse= ", reponse);
          this.onReset_add_indemnite_gardien()
          alert("Opération éffectuée avec succés")
          this.cb_add_indemnite_gardien.emit({
            status:true,
            indemnite_gardien:reponse.data
          })
      } else {
          console.log("L'opération sur la table indemnite_gardien a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_indemnite_gardien = false;
    })
  }
  //liste des gardiens 
  get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens = reponse.data
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }
  //indemnite
  get_indemnite() {
    this.loading_get_indemnite = true;
    this.api.taf_post("indemnite/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_indemnites = reponse.data
        console.log("Opération effectuée avec succés sur la table indemnite. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table indemnite a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_indemnite = false;
    }, (error: any) => {
      this.loading_get_indemnite = false;
    })
  }

}

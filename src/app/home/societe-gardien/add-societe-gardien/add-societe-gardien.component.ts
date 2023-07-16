
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
  //les collaborateurs
  loading_get_societe = false
  les_societes: any[] = []
  //les gardiens
  loading_get_gardien = false
  les_gardiens: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_societe()
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_add_societe_gardien  = this.formBuilder.group({
        id_societe: ["", Validators.required],
        id_gardien: ["", Validators.required],
        // date_affectation: ["", Validators.required],
        heure_debut_sg: [0,],
        heure_fin_sg: [0,],
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
          this.api.Swal_success("Gardien affecté avec succés")
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
   //liste des collaborateurs
   get_societe() {
    this.loading_get_societe = true;
    this.api.taf_post("societe/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_societes = reponse.data
        console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_societe = false;
    }, (error: any) => {
      this.loading_get_societe = false;
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

}

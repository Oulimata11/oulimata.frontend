
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-conges',
  templateUrl: './add-conges.component.html',
  styleUrls: ['./add-conges.component.scss']
})
export class AddCongesComponent {
  @Output()
  cb_add_conges=new EventEmitter()
  reactiveForm_add_conges !: FormGroup;
  submitted:boolean=false
  loading_add_conges :boolean=false

   //les gardiens
   loading_get_gardien = false
   les_gardiens: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_add_conges  = this.formBuilder.group({
id_gardien: ["", Validators.required],
date_debut_conges: ["", Validators.required],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_conges .controls; }
  // validation du formulaire
  onSubmit_add_conges () {
      this.submitted = true;
      console.log(this.reactiveForm_add_conges .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_conges .invalid) {
          return;
      }
      var conges = {
        id_utilisateur: this.api.token.user_connected.id_utilisateur,
        id_gardien : this.f.id_gardien.value,
        date_debut_conges: this.f.date_debut_conges.value,
      }
      this.add_conges (conges )
  }
  // vider le formulaire
  onReset_add_conges () {
      this.submitted = false;
      this.reactiveForm_add_conges .reset();
  }
  add_conges(conges: any) {
      this.loading_add_conges = true;
      this.api.taf_post("conges/add", conges, (reponse: any) => {
      this.loading_add_conges = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table conges. Réponse= ", reponse);
          this.onReset_add_conges()
          alert("Opération éffectuée avec succés")
          this.cb_add_conges.emit({
            status:true,
            conges:reponse.data
          })
      } else {
          console.log("L'opération sur la table conges a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_conges = false;
    })
  }
   //liste des gardiens
   get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens = reponse.data
        this.les_gardiens=this.les_gardiens.map(gardien => {
          var statut= gardien.statut_gardien == 1 ? "Actif" : "Inactif";
          var affectation =gardien.id_societe == null ? "Pas Affecté" : "Affecté"
          return {...gardien,statut,affectation}
        })
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

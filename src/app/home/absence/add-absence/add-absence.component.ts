
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
    //les gardiens
    loading_get_gardien = false
    les_gardiens: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_add_absence  = this.formBuilder.group({
id_gardien: ["", Validators.required],
date_absence: ["", Validators.required],
raison_absence: ["", Validators.required],
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
      var absence = { 
        id_utilisateur: this.api.token.user_connected.id_utilisateur,
        id_gardien : this.f.id_gardien.value,
        date_absence: this.f.date_absence.value,
        raison_absence: this.f.raison_absence.value,
    } 
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

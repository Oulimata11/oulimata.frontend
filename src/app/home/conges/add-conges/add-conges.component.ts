
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
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_conges  = this.formBuilder.group({
          id_conges: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_gardien: ["", Validators.required],
date_debut_conges: ["", Validators.required],
date_fin_conges: ["", Validators.required],
date_demande_conges: ["", Validators.required],
duree_conges: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
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
      var conges =this.reactiveForm_add_conges .value
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
  
}


import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent {
  @Output()
  cb_add_fournisseur=new EventEmitter()
  reactiveForm_add_fournisseur !: FormGroup;
  submitted:boolean=false
  loading_add_fournisseur :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_fournisseur  = this.formBuilder.group({
          id_fournisseur: ["", Validators.required],
nom_entreprise: ["", Validators.required],
prenom: ["", Validators.required],
nom: ["", Validators.required],
adresse: ["", Validators.required],
telephone: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_fournisseur .controls; }
  // validation du formulaire
  onSubmit_add_fournisseur () {
      this.submitted = true;
      console.log(this.reactiveForm_add_fournisseur .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_fournisseur .invalid) {
          return;
      }
      var fournisseur =this.reactiveForm_add_fournisseur .value
      this.add_fournisseur (fournisseur )
  }
  // vider le formulaire
  onReset_add_fournisseur () {
      this.submitted = false;
      this.reactiveForm_add_fournisseur .reset();
  }
  add_fournisseur(fournisseur: any) {
      this.loading_add_fournisseur = true;
      this.api.taf_post("fournisseur/add", fournisseur, (reponse: any) => {
      this.loading_add_fournisseur = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table fournisseur. Réponse= ", reponse);
          this.onReset_add_fournisseur()
          alert("Opération éffectuée avec succés")
          this.cb_add_fournisseur.emit({
            status:true,
            fournisseur:reponse.data
          })
      } else {
          console.log("L'opération sur la table fournisseur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_fournisseur = false;
    })
  }
  
}

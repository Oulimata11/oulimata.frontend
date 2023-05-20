
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})
export class EditFournisseurComponent {
  reactiveForm_edit_fournisseur !: FormGroup;
  submitted: boolean = false
  loading_edit_fournisseur: boolean = false
  @Input()
  fournisseur_to_edit: any = {}
  @Output()
  cb_edit_fournisseur=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.fournisseur_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_fournisseur  = this.formBuilder.group({
        id_fournisseur: ["", Validators.required],
nom_entreprise: ["", Validators.required],
prenom: ["", Validators.required],
nom: ["", Validators.required],
adresse: ["", Validators.required],
telephone: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(fournisseur_to_edit:any) {
      this.reactiveForm_edit_fournisseur = this.formBuilder.group({
          id_fournisseur: [fournisseur_to_edit.id_fournisseur, Validators.required],
nom_entreprise: [fournisseur_to_edit.nom_entreprise, Validators.required],
prenom: [fournisseur_to_edit.prenom, Validators.required],
nom: [fournisseur_to_edit.nom, Validators.required],
adresse: [fournisseur_to_edit.adresse, Validators.required],
telephone: [fournisseur_to_edit.telephone, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_fournisseur .controls; }
  // validation du formulaire
  onSubmit_edit_fournisseur() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_fournisseur.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_fournisseur.invalid) {
          return;
      }
      var fournisseur = this.reactiveForm_edit_fournisseur.value
      this.edit_fournisseur({
      condition:JSON.stringify({id_fournisseur:this.fournisseur_to_edit.id_fournisseur}),
      data:JSON.stringify(fournisseur)
      })
  }
  // vider le formulaire
  onReset_edit_fournisseur() {
      this.submitted = false;
      this.reactiveForm_edit_fournisseur.reset();
  }
  edit_fournisseur(fournisseur: any) {
      this.loading_edit_fournisseur = true;
      this.api.taf_post("fournisseur/edit", fournisseur, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_fournisseur.emit({
                  new_data:JSON.parse(fournisseur.data)
              })
              console.log("Opération effectuée avec succés sur la table fournisseur. Réponse= ", reponse);
              this.onReset_edit_fournisseur()
              alert("Opération effectuée avec succés sur la table fournisseur")
          } else {
              console.log("L'opération sur la table fournisseur a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_fournisseur = false;
      }, (error: any) => {
          this.loading_edit_fournisseur = false;
      })
  }
}

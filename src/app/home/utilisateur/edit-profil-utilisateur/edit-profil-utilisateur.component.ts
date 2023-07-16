import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';

@Component({
  selector: 'app-edit-profil-utilisateur',
  templateUrl: './edit-profil-utilisateur.component.html',
  styleUrls: ['./edit-profil-utilisateur.component.scss']
})
export class EditProfilUtilisateurComponent implements OnInit {
    @Input()
    user_to_edit: any = {};
    @Output()
    cb_edit_profil = new EventEmitter();
  reactiveForm_edit_utilisateur !: FormGroup;
  submitted: boolean = false
  loading_edit_utilisateur: boolean = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.user_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_utilisateur  = this.formBuilder.group({       
  nom_utilisateur: ["", Validators.required],
  prenom_utilisateur: ["", Validators.required],
  date_naissance_utilisateur: ["", Validators.required],
  lieu_naissance_utilisateur: ["", Validators.required],
  date_insertion_utilisateur: ["", Validators.required],
  telephone_utilisateur: ["", Validators.required],
  });
  }
  // mise à jour du formulaire
  update_form(utilisateur_to_edit:any) {
      this.reactiveForm_edit_utilisateur = this.formBuilder.group({
  nom_utilisateur: [utilisateur_to_edit.nom_utilisateur, Validators.required],
  prenom_utilisateur: [utilisateur_to_edit.prenom_utilisateur, Validators.required],
  date_naissance_utilisateur: [utilisateur_to_edit.date_naissance_utilisateur, Validators.required],
  lieu_naissance_utilisateur: [utilisateur_to_edit.lieu_naissance_utilisateur, Validators.required],
  date_insertion_utilisateur: [utilisateur_to_edit.date_insertion_utilisateur, Validators.required],
  telephone_utilisateur: [utilisateur_to_edit.telephone_utilisateur, Validators.required],
   });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_utilisateur.controls; }
  // validation du formulaire
  onSubmit_edit_utilisateur() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_utilisateur.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_utilisateur.invalid) {
          return;
      }
      if(!this.check_change()){
        alert("Il n'y a pas eu de changement");
        return;
      }
      var utilisateur = this.reactiveForm_edit_utilisateur.value
      this.edit_profil({
      condition:JSON.stringify({id_utilisateur:this.user_to_edit.id_utilisateur}),
      data:JSON.stringify(utilisateur)
      })
  }
  // vider le formulaire
  onReset_edit_utilisateur() {
      this.submitted = false;
      this.reactiveForm_edit_utilisateur.reset();
  }
  edit_profil(utilisateur: any) {
      this.loading_edit_utilisateur = true;
      this.api.taf_post("utilisateur/edit", utilisateur, (reponse: any) => {
          this.loading_edit_utilisateur = false;
          if (reponse.status) {
              console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
              this.cb_edit_profil.emit({new_data:JSON.parse(utilisateur.data)})
              this.onReset_edit_utilisateur()
              this.api.Swal_success("Profil modifié avec succés")
            } else {
              console.log("L\'opération sur la table utilisateur a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
      }, (error: any) => {
          this.loading_edit_utilisateur = false;
      })
  }
      //determiner s'il y'a chagement au niveau du formulaire ou pas 
  check_change() : boolean {
  // retourne true s'il y'a changement et false sinon
  for (const [key, value] of Object.entries(this.reactiveForm_edit_utilisateur.value)) {
    if (this.user_to_edit[key] != value) {
      return true;
      }
    }
      return false;
  }
}

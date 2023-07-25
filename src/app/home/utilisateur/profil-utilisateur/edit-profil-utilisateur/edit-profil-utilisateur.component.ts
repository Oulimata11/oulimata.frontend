import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  imageUrl: any;
  image_utilisateur: File;
  constructor(private formBuilder: FormBuilder, public api: ApiService,  private _router: Router) { }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.user_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_utilisateur  = this.formBuilder.group({       
  nom_utilisateur: ["", Validators.required],
  prenom_utilisateur: ["", Validators.required],
  date_naissance_utilisateur: ["", Validators.required],
  lieu_naissance_utilisateur: ["",],
  telephone_utilisateur: [""],
  image_utilisateur: [""],
  });
  }
  // mise à jour du formulaire
  update_form(utilisateur_to_edit:any) {
      this.reactiveForm_edit_utilisateur = this.formBuilder.group({
  nom_utilisateur: [utilisateur_to_edit.nom_utilisateur, Validators.required],
  prenom_utilisateur: [utilisateur_to_edit.prenom_utilisateur, Validators.required],
  date_naissance_utilisateur: [utilisateur_to_edit.date_naissance_utilisateur, Validators.required],
  lieu_naissance_utilisateur: [utilisateur_to_edit.lieu_naissance_utilisateur],
  telephone_utilisateur: [utilisateur_to_edit.telephone_utilisateur],
  image_utilisateur: [utilisateur_to_edit.image_utilisateur],

   });
  }
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.image_utilisateur = event.target.files[0];
    }
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
      if(!this.check_change() && !this.image_utilisateur){
        alert("Il n'y a pas eu de changement");
        return;
      }
      const utilisateur = new FormData();
      if (this.image_utilisateur) {
        utilisateur.append("image_utilisateur", this.image_utilisateur, this.image_utilisateur.name);
      }
       else {
        utilisateur.append("image_utilisateur",this.user_to_edit.image_utilisateur);
      }
      utilisateur.append("id_utilisateur", this.user_to_edit.id_utilisateur);
      utilisateur.append("nom_utilisateur", this.f.nom_utilisateur.value);
      utilisateur.append("prenom_utilisateur", this.f.prenom_utilisateur.value);
      utilisateur.append("date_naissance_utilisateur", this.f.date_naissance_utilisateur.value);
      utilisateur.append("lieu_naissance_utilisateur", this.f.lieu_naissance_utilisateur.value);
      utilisateur.append("telephone_utilisateur", this.f.telephone_utilisateur.value);
      this.edit_profil(utilisateur)
  }
  // vider le formulaire
  onReset_edit_utilisateur() {
      this.submitted = false;
      this.reactiveForm_edit_utilisateur.reset();
  }
  edit_profil(utilisateur: any) {
      this.loading_edit_utilisateur = true;
      this.api.taf_post("utilisateur/profil_edit", utilisateur, (reponse: any) => {
          this.loading_edit_utilisateur = false;
          if (reponse.status) {
              console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
              let new_utilisateur = utilisateur; //Object.assign({},JSON.parse(utilisateur.data))
              new_utilisateur.id_utilisateur = this.user_to_edit.id_utilisateur;
              this.cb_edit_profil.emit(new_utilisateur)
              this.logout()
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
  logout() {
    this.api.network = {
      token: undefined,
      status: true,
      message: "Aucun probléme détecté",
    }
    this.api.token = {
      token_key: null,
      token_decoded: null,
      user_connected: null,
      is_expired: null,
      date_expiration: null
    }
    this.api.delete_from_local_storage("token")
    this._router.navigate(['/public/login'])
  }
}

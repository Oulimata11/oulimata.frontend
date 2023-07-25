import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/service/api/api.service';

@Component({
  selector: 'app-edit-password-utilisateur',
  templateUrl: './edit-password-utilisateur.component.html',
  styleUrls: ['./edit-password-utilisateur.component.scss']
})
export class EditPasswordUtilisateurComponent implements OnInit {

  @Input()
  utilisateur_to_edit: any = {};
  @Output()
  cb_edit_password = new EventEmitter();
  reactiveForm_edit_utilisateur!: FormGroup;
  submitted: boolean = false;
  passwordTextType: boolean;
  loading_edit_password = false ;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    private _router: Router
  ) {
    // récupération des paramètres depuis l'URL
  }
  ngOnInit(): void {
    this.init_form();
  }
  init_form() {
    this.reactiveForm_edit_utilisateur = this.formBuilder.group({
      ancien_password_utilisateur: ["", Validators.required],
      new_password_utilisateur: ["", Validators.required],
      confirmation_new_password_utilisateur: ["", Validators.required],
    });
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  // acces facile au champs de votre questionnaire
  get f(): any {
    return this.reactiveForm_edit_utilisateur.controls;
  }

  // validation du questionnaire
  onSubmit_edit_utilisateur() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_utilisateur.value);
    if (this.f.confirmation_new_password_utilisateur.value != this.f.new_password_utilisateur.value) {
      this.f.confirmation_new_password_utilisateur.setErrors({ 'conformite': true })
    }
    // stop here if form is invalid
    if (this.reactiveForm_edit_utilisateur.invalid) {
      return;
    }
    // on verifie la validé du questionnaire
    if (!this.check_change()) {
      alert("Il n'y a pas eu de changements");
      return;
    }
    const utilisateur = this.reactiveForm_edit_utilisateur.value
    utilisateur.id_utilisateur = this.utilisateur_to_edit.id_utilisateur
    this.edit_utilisateur(utilisateur);
  }
  check_change(): boolean {
    if (this.f.ancien_password_utilisateur.value == this.f.new_password_utilisateur.value) {
      return false
    } else {
      return true;
    }
  }
  // vider le questionnaire
  onReset_edit_utilisateur() {
    this.submitted = false;
    this.reactiveForm_edit_utilisateur.reset();
  }
  edit_utilisateur(utilisateur: any) {
    this.loading_edit_password = true;
    this.api.taf_post(
      "utilisateur/update_password",utilisateur,(reponse: any) => {
        this.loading_edit_password = false;
        if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ",reponse);
          this.api.Swal_success("Mot de passe modifié avec succés!");
          this.onReset_edit_utilisateur();
          let new_utilisateur = utilisateur; //Object.assign({},JSON.parse(utilisateur.data))
          new_utilisateur.id_utilisateur = this.utilisateur_to_edit.id_utilisateur;
          this.cb_edit_password.emit(new_utilisateur)
          this.logout();
        } else {
          console.log(
            "L'opération sur la table utilisateur a échoué. Réponse= ",
            reponse
          );
          alert("La tentative de modification du mot de passe a echoué");
        }
      },
      (error: any) => {
        this.loading_edit_password = false;
      }
    );
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

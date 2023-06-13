
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.scss']
})
export class EditUtilisateurComponent {
  reactiveForm_edit_utilisateur !: FormGroup;
  submitted: boolean = false
  loading_edit_utilisateur: boolean = false
  @Input()
  utilisateur_to_edit: any = {}
  @Output()
  cb_edit_utilisateur=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.utilisateur_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_utilisateur  = this.formBuilder.group({
        id_role: ["", Validators.required],
});
  }
  // mise à jour du formulaire
  update_form(utilisateur_to_edit:any) {
      this.reactiveForm_edit_utilisateur = this.formBuilder.group({
        id_role: [utilisateur_to_edit.id_role, Validators.required],

      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_utilisateur .controls; }
  // validation du formulaire
  onSubmit_edit_utilisateur() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_utilisateur.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_utilisateur.invalid) {
          return;
      }
      var utilisateur = this.reactiveForm_edit_utilisateur.value
      this.edit_utilisateur({
      condition:JSON.stringify({id_utilisateur:this.utilisateur_to_edit.id_utilisateur}),
      data:JSON.stringify(utilisateur)
      })
  }
  // vider le formulaire
  onReset_edit_utilisateur() {
      this.submitted = false;
      this.reactiveForm_edit_utilisateur.reset();
  }
  edit_utilisateur(utilisateur: any) {
      this.loading_edit_utilisateur = true;
      this.api.taf_post("utilisateur/edit", utilisateur, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_utilisateur.emit({new_data:JSON.parse(utilisateur.data)})
              console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
              this.onReset_edit_utilisateur()
              this.api.Swal_success("Utilisateur modifié avec succés")
          } else {
              console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_utilisateur = false;
      }, (error: any) => {
          this.loading_edit_utilisateur = false;
      })
  }
}

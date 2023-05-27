
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-indemnite',
  templateUrl: './edit-indemnite.component.html',
  styleUrls: ['./edit-indemnite.component.scss']
})
export class EditIndemniteComponent {
  reactiveForm_edit_indemnite !: FormGroup;
  submitted: boolean = false
  loading_edit_indemnite: boolean = false
  @Input()
  indemnite_to_edit: any = {}
  @Output()
  cb_edit_indemnite=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.indemnite_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_indemnite  = this.formBuilder.group({
        id_indemnite: ["", Validators.required],
id_utilisateur: ["", Validators.required],
date_indemnite: ["", Validators.required],
nature_indemnite: ["", Validators.required],
montant_indemnite: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(indemnite_to_edit:any) {
      this.reactiveForm_edit_indemnite = this.formBuilder.group({
          id_indemnite: [indemnite_to_edit.id_indemnite, Validators.required],
id_utilisateur: [indemnite_to_edit.id_utilisateur, Validators.required],
date_indemnite: [indemnite_to_edit.date_indemnite, Validators.required],
nature_indemnite: [indemnite_to_edit.nature_indemnite, Validators.required],
montant_indemnite: [indemnite_to_edit.montant_indemnite, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_indemnite .controls; }
  // validation du formulaire
  onSubmit_edit_indemnite() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_indemnite.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_indemnite.invalid) {
          return;
      }
      var indemnite = this.reactiveForm_edit_indemnite.value
      this.edit_indemnite({
      condition:JSON.stringify({id_indemnite:this.indemnite_to_edit.id_indemnite}),
      data:JSON.stringify(indemnite)
      })
  }
  // vider le formulaire
  onReset_edit_indemnite() {
      this.submitted = false;
      this.reactiveForm_edit_indemnite.reset();
  }
  edit_indemnite(indemnite: any) {
      this.loading_edit_indemnite = true;
      this.api.taf_post("indemnite/edit", indemnite, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_indemnite.emit({
                  new_data:JSON.parse(indemnite.data)
              })
              console.log("Opération effectuée avec succés sur la table indemnite. Réponse= ", reponse);
              this.onReset_edit_indemnite()
              alert("Opération effectuée avec succés sur la table indemnite")
          } else {
              console.log("L'opération sur la table indemnite a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_indemnite = false;
      }, (error: any) => {
          this.loading_edit_indemnite = false;
      })
  }
}


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent {
  reactiveForm_edit_role !: FormGroup;
  submitted: boolean = false
  loading_edit_role: boolean = false
  @Input()
  role_to_edit: any = {}
  @Output()
  cb_edit_role=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.role_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_role  = this.formBuilder.group({
        id_role: ["", Validators.required],
libelle_role: ["", Validators.required],
description_role: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(role_to_edit:any) {
      this.reactiveForm_edit_role = this.formBuilder.group({
          id_role: [role_to_edit.id_role, Validators.required],
libelle_role: [role_to_edit.libelle_role, Validators.required],
description_role: [role_to_edit.description_role, Validators.required],
created_at: [role_to_edit.created_at, Validators.required],
updated_at: [role_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_role .controls; }
  // validation du formulaire
  onSubmit_edit_role() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_role.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_role.invalid) {
          return;
      }
      var role = this.reactiveForm_edit_role.value
      this.edit_role({
      condition:JSON.stringify({id_role:this.role_to_edit.id_role}),
      data:JSON.stringify(role)
      })
  }
  // vider le formulaire
  onReset_edit_role() {
      this.submitted = false;
      this.reactiveForm_edit_role.reset();
  }
  edit_role(role: any) {
      this.loading_edit_role = true;
      this.api.taf_post("role/edit", role, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_role.emit({
                  new_data:JSON.parse(role.data)
              })
              console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
              this.onReset_edit_role()
              alert("Opération effectuée avec succés sur la table role")
          } else {
              console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_role = false;
      }, (error: any) => {
          this.loading_edit_role = false;
      })
  }
}

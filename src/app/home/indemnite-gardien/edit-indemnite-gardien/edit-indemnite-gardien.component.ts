
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-indemnite-gardien',
  templateUrl: './edit-indemnite-gardien.component.html',
  styleUrls: ['./edit-indemnite-gardien.component.scss']
})
export class EditIndemniteGardienComponent {
  reactiveForm_edit_indemnite_gardien !: FormGroup;
  submitted: boolean = false
  loading_edit_indemnite_gardien: boolean = false
  @Input()
  indemnite_gardien_to_edit: any = {}
  @Output()
  cb_edit_indemnite_gardien=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.indemnite_gardien_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_indemnite_gardien  = this.formBuilder.group({
        id_i_g: ["", Validators.required],
id_indemnite: ["", Validators.required],
id_gardien: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(indemnite_gardien_to_edit:any) {
      this.reactiveForm_edit_indemnite_gardien = this.formBuilder.group({
          id_i_g: [indemnite_gardien_to_edit.id_i_g, Validators.required],
id_indemnite: [indemnite_gardien_to_edit.id_indemnite, Validators.required],
id_gardien: [indemnite_gardien_to_edit.id_gardien, Validators.required],
created_at: [indemnite_gardien_to_edit.created_at, Validators.required],
updated_at: [indemnite_gardien_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_indemnite_gardien .controls; }
  // validation du formulaire
  onSubmit_edit_indemnite_gardien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_indemnite_gardien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_indemnite_gardien.invalid) {
          return;
      }
      var indemnite_gardien = this.reactiveForm_edit_indemnite_gardien.value
      this.edit_indemnite_gardien({
      condition:JSON.stringify({id_indemnite_gardien:this.indemnite_gardien_to_edit.id_indemnite_gardien}),
      data:JSON.stringify(indemnite_gardien)
      })
  }
  // vider le formulaire
  onReset_edit_indemnite_gardien() {
      this.submitted = false;
      this.reactiveForm_edit_indemnite_gardien.reset();
  }
  edit_indemnite_gardien(indemnite_gardien: any) {
      this.loading_edit_indemnite_gardien = true;
      this.api.taf_post("indemnite_gardien/edit", indemnite_gardien, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_indemnite_gardien.emit({
                  new_data:JSON.parse(indemnite_gardien.data)
              })
              console.log("Opération effectuée avec succés sur la table indemnite_gardien. Réponse= ", reponse);
              this.onReset_edit_indemnite_gardien()
              alert("Opération effectuée avec succés sur la table indemnite_gardien")
          } else {
              console.log("L'opération sur la table indemnite_gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_indemnite_gardien = false;
      }, (error: any) => {
          this.loading_edit_indemnite_gardien = false;
      })
  }
}

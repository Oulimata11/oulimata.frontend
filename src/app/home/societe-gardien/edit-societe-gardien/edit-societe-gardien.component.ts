
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-societe-gardien',
  templateUrl: './edit-societe-gardien.component.html',
  styleUrls: ['./edit-societe-gardien.component.scss']
})
export class EditSocieteGardienComponent {
  reactiveForm_edit_societe_gardien !: FormGroup;
  submitted: boolean = false
  loading_edit_societe_gardien: boolean = false
  @Input()
  societe_gardien_to_edit: any = {}
  @Output()
  cb_edit_societe_gardien=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.societe_gardien_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_societe_gardien  = this.formBuilder.group({
        id_societe_gardien: ["", Validators.required],
id_societe: ["", Validators.required],
id_gardien: ["", Validators.required],
date_affectation: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(societe_gardien_to_edit:any) {
      this.reactiveForm_edit_societe_gardien = this.formBuilder.group({
          id_societe_gardien: [societe_gardien_to_edit.id_societe_gardien, Validators.required],
id_societe: [societe_gardien_to_edit.id_societe, Validators.required],
id_gardien: [societe_gardien_to_edit.id_gardien, Validators.required],
date_affectation: [societe_gardien_to_edit.date_affectation, Validators.required],
created_at: [societe_gardien_to_edit.created_at, Validators.required],
updated_at: [societe_gardien_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_societe_gardien .controls; }
  // validation du formulaire
  onSubmit_edit_societe_gardien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_societe_gardien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_societe_gardien.invalid) {
          return;
      }
      var societe_gardien = this.reactiveForm_edit_societe_gardien.value
      this.edit_societe_gardien({
      condition:JSON.stringify({id_societe_gardien:this.societe_gardien_to_edit.id_societe_gardien}),
      data:JSON.stringify(societe_gardien)
      })
  }
  // vider le formulaire
  onReset_edit_societe_gardien() {
      this.submitted = false;
      this.reactiveForm_edit_societe_gardien.reset();
  }
  edit_societe_gardien(societe_gardien: any) {
      this.loading_edit_societe_gardien = true;
      this.api.taf_post("societe_gardien/edit", societe_gardien, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_societe_gardien.emit({
                  new_data:JSON.parse(societe_gardien.data)
              })
              console.log("Opération effectuée avec succés sur la table societe_gardien. Réponse= ", reponse);
              this.onReset_edit_societe_gardien()
              alert("Opération effectuée avec succés sur la table societe_gardien")
          } else {
              console.log("L'opération sur la table societe_gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_societe_gardien = false;
      }, (error: any) => {
          this.loading_edit_societe_gardien = false;
      })
  }
}

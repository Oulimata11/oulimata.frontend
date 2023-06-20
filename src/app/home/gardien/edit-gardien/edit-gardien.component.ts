
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-gardien',
  templateUrl: './edit-gardien.component.html',
  styleUrls: ['./edit-gardien.component.scss']
})
export class EditGardienComponent {
  reactiveForm_edit_gardien !: FormGroup;
  submitted: boolean = false
  loading_edit_gardien: boolean = false
  @Input()
  gardien_to_edit: any = {}
  @Output()
  cb_edit_gardien=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.gardien_to_edit)
  }
  init_form() {
    this.reactiveForm_edit_gardien  = this.formBuilder.group({
        
id_gardien: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_societe: ["", Validators.required],
matricule_gardien: ["", Validators.required],
nom_gardien: ["", Validators.required],
prenom_gardien: ["", Validators.required],
date_naissance_gardien: ["", Validators.required],
lieu_naissance_gardien: ["", Validators.required],
date_insertion_gardien: ["", Validators.required],
telephone_gardien: ["", Validators.required],
email_gardien: ["", Validators.required],
statut_gardien: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
    });
}
  // mise à jour du formulaire
  update_form(gardien_to_edit:any) {
    this.reactiveForm_edit_gardien = this.formBuilder.group({
        
nom_gardien: [gardien_to_edit.nom_gardien, Validators.required],
prenom_gardien: [gardien_to_edit.prenom_gardien, Validators.required],
date_naissance_gardien: [gardien_to_edit.date_naissance_gardien, Validators.required],
lieu_naissance_gardien: [gardien_to_edit.lieu_naissance_gardien, Validators.required],
date_insertion_gardien: [gardien_to_edit.date_insertion_gardien, Validators.required],
telephone_gardien: [gardien_to_edit.telephone_gardien, Validators.required],
email_gardien: [gardien_to_edit.email_gardien, Validators.required],
    });
}


  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_gardien .controls; }
  // validation du formulaire
  onSubmit_edit_gardien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_gardien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_gardien.invalid) {
          return;
      }
      var gardien = this.reactiveForm_edit_gardien.value
      this.edit_gardien({
      condition:JSON.stringify({id_gardien:this.gardien_to_edit.id_gardien}),
      data:JSON.stringify(gardien)
      })
  }
  // vider le formulaire
  onReset_edit_gardien() {
      this.submitted = false;
      this.reactiveForm_edit_gardien.reset();
  }
  edit_gardien(gardien: any) {
      this.loading_edit_gardien = true;
      this.api.taf_post("gardien/edit", gardien, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_gardien.emit({
                  new_data:JSON.parse(gardien.data)
              })
              console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", reponse);
              this.onReset_edit_gardien()
              this.api.Swal_success("Gardien modifié avec succés")
          } else {
              console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_gardien = false;
      }, (error: any) => {
          this.loading_edit_gardien = false;
      })
  }
}

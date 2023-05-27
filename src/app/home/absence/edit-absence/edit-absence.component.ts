
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.scss']
})
export class EditAbsenceComponent {
  reactiveForm_edit_absence !: FormGroup;
  submitted: boolean = false
  loading_edit_absence: boolean = false
  @Input()
  absence_to_edit: any = {}
  @Output()
  cb_edit_absence=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.absence_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_absence  = this.formBuilder.group({
        id_absence: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_gardien: ["", Validators.required],
date_absence: ["", Validators.required],
raison_absence: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(absence_to_edit:any) {
      this.reactiveForm_edit_absence = this.formBuilder.group({
          id_absence: [absence_to_edit.id_absence, Validators.required],
id_utilisateur: [absence_to_edit.id_utilisateur, Validators.required],
id_gardien: [absence_to_edit.id_gardien, Validators.required],
date_absence: [absence_to_edit.date_absence, Validators.required],
raison_absence: [absence_to_edit.raison_absence, Validators.required],
created_at: [absence_to_edit.created_at, Validators.required],
updated_at: [absence_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_absence .controls; }
  // validation du formulaire
  onSubmit_edit_absence() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_absence.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_absence.invalid) {
          return;
      }
      var absence = this.reactiveForm_edit_absence.value
      this.edit_absence({
      condition:JSON.stringify({id_absence:this.absence_to_edit.id_absence}),
      data:JSON.stringify(absence)
      })
  }
  // vider le formulaire
  onReset_edit_absence() {
      this.submitted = false;
      this.reactiveForm_edit_absence.reset();
  }
  edit_absence(absence: any) {
      this.loading_edit_absence = true;
      this.api.taf_post("absence/edit", absence, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_absence.emit({
                  new_data:JSON.parse(absence.data)
              })
              console.log("Opération effectuée avec succés sur la table absence. Réponse= ", reponse);
              this.onReset_edit_absence()
              alert("Opération effectuée avec succés sur la table absence")
          } else {
              console.log("L'opération sur la table absence a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_absence = false;
      }, (error: any) => {
          this.loading_edit_absence = false;
      })
  }
}

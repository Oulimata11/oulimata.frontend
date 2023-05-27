
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-localisation',
  templateUrl: './edit-localisation.component.html',
  styleUrls: ['./edit-localisation.component.scss']
})
export class EditLocalisationComponent {
  reactiveForm_edit_localisation !: FormGroup;
  submitted: boolean = false
  loading_edit_localisation: boolean = false
  @Input()
  localisation_to_edit: any = {}
  @Output()
  cb_edit_localisation=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.localisation_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_localisation  = this.formBuilder.group({
        id_localisation: ["", Validators.required],
longitude_localisation: ["", Validators.required],
latitude_localisation: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(localisation_to_edit:any) {
      this.reactiveForm_edit_localisation = this.formBuilder.group({
          id_localisation: [localisation_to_edit.id_localisation, Validators.required],
longitude_localisation: [localisation_to_edit.longitude_localisation, Validators.required],
latitude_localisation: [localisation_to_edit.latitude_localisation, Validators.required],
created_at: [localisation_to_edit.created_at, Validators.required],
updated_at: [localisation_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_localisation .controls; }
  // validation du formulaire
  onSubmit_edit_localisation() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_localisation.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_localisation.invalid) {
          return;
      }
      var localisation = this.reactiveForm_edit_localisation.value
      this.edit_localisation({
      condition:JSON.stringify({id_localisation:this.localisation_to_edit.id_localisation}),
      data:JSON.stringify(localisation)
      })
  }
  // vider le formulaire
  onReset_edit_localisation() {
      this.submitted = false;
      this.reactiveForm_edit_localisation.reset();
  }
  edit_localisation(localisation: any) {
      this.loading_edit_localisation = true;
      this.api.taf_post("localisation/edit", localisation, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_localisation.emit({
                  new_data:JSON.parse(localisation.data)
              })
              console.log("Opération effectuée avec succés sur la table localisation. Réponse= ", reponse);
              this.onReset_edit_localisation()
              alert("Opération effectuée avec succés sur la table localisation")
          } else {
              console.log("L'opération sur la table localisation a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_localisation = false;
      }, (error: any) => {
          this.loading_edit_localisation = false;
      })
  }
}

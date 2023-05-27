
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-conges',
  templateUrl: './edit-conges.component.html',
  styleUrls: ['./edit-conges.component.scss']
})
export class EditCongesComponent {
  reactiveForm_edit_conges !: FormGroup;
  submitted: boolean = false
  loading_edit_conges: boolean = false
  @Input()
  conges_to_edit: any = {}
  @Output()
  cb_edit_conges=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.conges_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_conges  = this.formBuilder.group({
        id_conges: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_gardien: ["", Validators.required],
date_debut_conges: ["", Validators.required],
date_fin_conges: ["", Validators.required],
date_demande_conges: ["", Validators.required],
duree_conges: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(conges_to_edit:any) {
      this.reactiveForm_edit_conges = this.formBuilder.group({
          id_conges: [conges_to_edit.id_conges, Validators.required],
id_utilisateur: [conges_to_edit.id_utilisateur, Validators.required],
id_gardien: [conges_to_edit.id_gardien, Validators.required],
date_debut_conges: [conges_to_edit.date_debut_conges, Validators.required],
date_fin_conges: [conges_to_edit.date_fin_conges, Validators.required],
date_demande_conges: [conges_to_edit.date_demande_conges, Validators.required],
duree_conges: [conges_to_edit.duree_conges, Validators.required],
created_at: [conges_to_edit.created_at, Validators.required],
updated_at: [conges_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_conges .controls; }
  // validation du formulaire
  onSubmit_edit_conges() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_conges.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_conges.invalid) {
          return;
      }
      var conges = this.reactiveForm_edit_conges.value
      this.edit_conges({
      condition:JSON.stringify({id_conges:this.conges_to_edit.id_conges}),
      data:JSON.stringify(conges)
      })
  }
  // vider le formulaire
  onReset_edit_conges() {
      this.submitted = false;
      this.reactiveForm_edit_conges.reset();
  }
  edit_conges(conges: any) {
      this.loading_edit_conges = true;
      this.api.taf_post("conges/edit", conges, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_conges.emit({
                  new_data:JSON.parse(conges.data)
              })
              console.log("Opération effectuée avec succés sur la table conges. Réponse= ", reponse);
              this.onReset_edit_conges()
              alert("Opération effectuée avec succés sur la table conges")
          } else {
              console.log("L'opération sur la table conges a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_conges = false;
      }, (error: any) => {
          this.loading_edit_conges = false;
      })
  }
}

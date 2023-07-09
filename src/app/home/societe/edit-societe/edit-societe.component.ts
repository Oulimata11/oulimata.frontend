
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-societe',
  templateUrl: './edit-societe.component.html',
  styleUrls: ['./edit-societe.component.scss']
})
export class EditSocieteComponent {
  reactiveForm_edit_societe !: FormGroup;
  submitted: boolean = false
  loading_edit_societe: boolean = false
  hasChange :boolean =false
  @Input()
  societe_to_edit: any = {}
  @Output()
  cb_edit_societe=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.societe_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_societe  = this.formBuilder.group({
nom_societe: ["", Validators.required],
description_societe: ["", Validators.required],
      });
  }
  // mise à jour du formulaire
  update_form(societe_to_edit:any) {
      this.reactiveForm_edit_societe = this.formBuilder.group({
nom_societe: [societe_to_edit.nom_societe, Validators.required],
description_societe: [societe_to_edit.description_societe, Validators.required],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_societe .controls; }
  // validation du formulaire
  onSubmit_edit_societe() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_societe.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_societe.invalid) {
          return;
      }
      this.hasChange=this.api.check_change(this.reactiveForm_edit_societe.value,this.societe_to_edit)
      if(!this.hasChange) {
        alert("Il n'y a pas eu de changement");
        return;
      }
      var societe = this.reactiveForm_edit_societe.value
      this.edit_societe({
      condition:JSON.stringify({id_societe:this.societe_to_edit.id_societe}),
      data:JSON.stringify(societe)
      })
  }
  // vider le formulaire
  onReset_edit_societe() {
      this.submitted = false;
      this.reactiveForm_edit_societe.reset();
  }
  edit_societe(societe: any) {
      this.loading_edit_societe = true;
      this.api.taf_post("societe/edit", societe, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_societe.emit({
                  new_data:JSON.parse(societe.data)
              })
              console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
              this.onReset_edit_societe()
              alert("Opération effectuée avec succés sur la table societe")
          } else {
              console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_societe = false;
      }, (error: any) => {
          this.loading_edit_societe = false;
      })
  }
}

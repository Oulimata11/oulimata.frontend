
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
  loading_edit_absence: boolean
  @Input()
  absence_to_edit: any = {}
  @Output()
  cb_edit_absence=new EventEmitter()
   //les gardiens
   loading_get_gardien = false
   les_gardiens: any[] = []
   hasChange : boolean =false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.absence_to_edit)
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_edit_absence  = this.formBuilder.group({
id_gardien: ["", Validators.required],
date_absence: ["", Validators.required],
raison_absence: [""],
      });
  }
  // mise à jour du formulaire
  update_form(absence_to_edit:any) {
      this.reactiveForm_edit_absence = this.formBuilder.group({
id_gardien: [absence_to_edit.id_gardien, Validators.required],
date_absence: [absence_to_edit.date_absence, Validators.required],
raison_absence: [absence_to_edit.raison_absence, Validators.required],
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
    //     //determiner s'il y'a chagement au niveau du formulaire ou pas 
     this.hasChange= this.api.check_change(this.reactiveForm_edit_absence.value,this.absence_to_edit)
    if (!this.hasChange) {
        alert("Il n'y a pas eu de changements");
        console.log("La valeur apres comparaison", this.hasChange)
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
        this.loading_edit_absence = false;
          if (reponse.status) {
              this.cb_edit_absence.emit({new_data:JSON.parse(absence.data)})
              console.log("Opération effectuée avec succés sur la table absence. Réponse= ", reponse);
              this.onReset_edit_absence()
              alert("Opération effectuée avec succés sur la table absence")
          } else {
              console.log("L'opération sur la table absence a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
      }, (error: any) => {
          this.loading_edit_absence = false;
      })
  }

  //liste des gardiens
    get_gardien() {
        this.loading_get_gardien = true;
        this.api.taf_post("gardien/get", {}, (reponse: any) => {
          if (reponse.status) {
            this.les_gardiens = reponse.data
            console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
          } else {
            console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
            alert("L'opération a echoué")
          }
          this.loading_get_gardien = false;
        }, (error: any) => {
          this.loading_get_gardien = false;
        })
    }
}

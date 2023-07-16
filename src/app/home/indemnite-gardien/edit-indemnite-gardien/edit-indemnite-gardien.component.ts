
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
   //gardien
   loading_get_gardien = false
   les_gardiens: any[] = []
    //indemnite
    loading_get_indemnite = false
    les_indemnites: any[] = [] 
  hasChange : boolean =false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.indemnite_gardien_to_edit)
      this.get_gardien()
      this.get_indemnite()
  }
  init_form() {
    this.reactiveForm_edit_indemnite_gardien  = this.formBuilder.group({
    id_indemnite: ["", Validators.required],
    id_gardien: ["", Validators.required],
    montant_indemnite: ["", Validators.required],
    date_indemnite: ["", Validators.required],
    });
  }
  // mise à jour du formulaire
  update_form(indemnite_gardien_to_edit:any) {
    this.reactiveForm_edit_indemnite_gardien = this.formBuilder.group({
    id_indemnite: [indemnite_gardien_to_edit.id_indemnite, Validators.required],
    id_gardien: [indemnite_gardien_to_edit.id_gardien, Validators.required],
    montant_indemnite: [indemnite_gardien_to_edit.montant_indemnite, Validators.required],
    date_indemnite: [indemnite_gardien_to_edit.date_indemnite, Validators.required],
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
      if(!this.check_change()){
        alert("Il n'y a pas eu de changement");
        return;
      }
      var indemnite_gardien = this.reactiveForm_edit_indemnite_gardien.value
      this.edit_indemnite_gardien({
      condition:JSON.stringify({id_i_g:this.indemnite_gardien_to_edit.id_i_g}),
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
              this.cb_edit_indemnite_gardien.emit({new_data:JSON.parse(indemnite_gardien.data)})
              console.log("Opération effectuée avec succés sur la table indemnite_gardien. Réponse= ", reponse);
              this.onReset_edit_indemnite_gardien()
              this.api.Swal_success("Indemnité modifiée avec succés")
            } else {
              console.log("L'opération sur la table indemnite_gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_indemnite_gardien = false;
      }, (error: any) => {
          this.loading_edit_indemnite_gardien = false;
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
      //indemnite
      get_indemnite() {
        this.loading_get_indemnite = true;
        this.api.taf_post("indemnite/get", {}, (reponse: any) => {
          if (reponse.status) {
            this.les_indemnites = reponse.data
            console.log("Opération effectuée avec succés sur la table indemnite. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table indemnite a échoué. Réponse= ", reponse);
            alert("L'opération a echoué")
          }
          this.loading_get_indemnite = false;
        }, (error: any) => {
          this.loading_get_indemnite = false;
        })
      }
         //determiner s'il y'a chagement au niveau du formulaire ou pas 
    check_change() : boolean {
      // retourne true s'il y'a changement et false sinon
      for (const [key, value] of Object.entries(this.reactiveForm_edit_indemnite_gardien.value)) {
        if (this.indemnite_gardien_to_edit[key] != value) {
          // il y'a eu un changement
          return true;
        }
      }
      return false;
    }
}

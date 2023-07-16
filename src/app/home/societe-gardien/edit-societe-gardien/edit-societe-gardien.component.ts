
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

    //les collaborateurs
    loading_get_societe = false
    les_societes: any[] = []
    //les gardiens
    loading_get_gardien = false
    les_gardiens: any[] = []
    hasChange : boolean =false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.societe_gardien_to_edit)
      this.get_gardien()
      this.get_societe()
  }
  init_form() {
      this.reactiveForm_edit_societe_gardien  = this.formBuilder.group({
id_societe: ["", Validators.required],
id_gardien: ["", Validators.required],
// date_affectation: ["", Validators.required],
heure_debut_sg: [0,],
heure_fin_sg: [0,],
      });
  }
  // mise à jour du formulaire
  update_form(societe_gardien_to_edit:any) {
    this.reactiveForm_edit_societe_gardien = this.formBuilder.group({
    id_societe: [societe_gardien_to_edit.id_societe, Validators.required],
    id_gardien: [societe_gardien_to_edit.id_gardien, Validators.required],
    // date_affectation: [societe_gardien_to_edit.date_affectation, Validators.required],
    heure_debut_sg: [societe_gardien_to_edit.heure_debut_sg, Validators.required],
    heure_fin_sg: [societe_gardien_to_edit.heure_fin_sg, Validators.required],
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
  if(!this.check_change()){
    alert("Il n'y a pas eu de changement");
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
              this.api.Swal_success("Affectation modifiée avec succés")
            } else {
              console.log("L'opération sur la table societe_gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_societe_gardien = false;
      }, (error: any) => {
          this.loading_edit_societe_gardien = false;
      })
  }
     //liste des collaborateurs
     get_societe() {
        this.loading_get_societe = true;
        this.api.taf_post("societe/get", {}, (reponse: any) => {
          if (reponse.status) {
            this.les_societes = reponse.data
            console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
            alert("L'opération a echoué")
          }
          this.loading_get_societe = false;
        }, (error: any) => {
          this.loading_get_societe = false;
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
     //determiner s'il y'a chagement au niveau du formulaire ou pas 
     check_change() : boolean {
      // retourne true s'il y'a changement et false sinon
      for (const [key, value] of Object.entries(this.reactiveForm_edit_societe_gardien.value)) {
        if (this.societe_gardien_to_edit[key] != value) {
          // il y'a eu un changement
          return true;
        }
      }
      return false;
    }
}

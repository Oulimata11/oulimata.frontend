
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
import moment from 'moment';
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
   //les gardiens
   loading_get_gardien = false
   les_gardiens: any[] = []
   date_fin_conges : any
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.conges_to_edit)
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_edit_conges  = this.formBuilder.group({
        id_gardien: ["", Validators.required],
        date_debut_conges: ["", Validators.required],
      });
  }
  // mise à jour du formulaire
  update_form(conges_to_edit:any) {
    this.reactiveForm_edit_conges = this.formBuilder.group({
    id_gardien: [conges_to_edit.id_gardien, Validators.required],
    date_debut_conges: [conges_to_edit.date_debut_conges, Validators.required],
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
      if(!this.check_change()){
        alert("Il y'a pas eu de changement");
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
     //liste des gardiens
     get_gardien() {
        this.loading_get_gardien = true;
        this.api.taf_post("gardien/get", {}, (reponse: any) => {
          this.loading_get_gardien = false;
          if (reponse.status) {
            this.les_gardiens = reponse.data
            this.les_gardiens=this.les_gardiens.map(gardien => {
              var statut= gardien.statut_gardien == 1 ? "Actif" : "Inactif";
              var affectation =gardien.id_societe == null ? "Pas Affecté" : "Affecté"
              return {...gardien,statut,affectation}
            })
            console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
          } else {
            console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
            alert("L'opération a echoué")
          }
        }, (error: any) => {
          this.loading_get_gardien = false;
        })
      }
      //determiner s'il y'a chagement au niveau du formulaire ou pas 
      check_change() : boolean {
        // retourne true s'il y'a changement et false sinon
        for (const [key, value] of Object.entries(this.reactiveForm_edit_conges.value)) {
          if (this.conges_to_edit[key] != value) {
            // il y'a eu un changement
            return true;
          }
        }
        return false;
      }
      calcul_fin_conges() {
        if (this.reactiveForm_edit_conges.valid) {
          const dateDebut = this.reactiveForm_edit_conges.value.date_debut_conges;
          const momentDateDebut = moment(dateDebut, 'YYYY-MM-DD').add(1, 'month');
          this.date_fin_conges = momentDateDebut.format('DD/MM/YYYY');
        } else {
          this.date_fin_conges = '';
        }
      }
}

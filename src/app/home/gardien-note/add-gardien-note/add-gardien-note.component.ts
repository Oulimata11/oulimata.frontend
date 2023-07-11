
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-gardien-note',
  templateUrl: './add-gardien-note.component.html',
  styleUrls: ['./add-gardien-note.component.scss']
})
export class AddGardienNoteComponent {
  @Output()
  cb_add_gardien_note=new EventEmitter()
  reactiveForm_add_gardien_note !: FormGroup;
  submitted:boolean=false
  loading_add_gardien_note :boolean=false
  loading_get_note = false
  les_notes: any[] = []
  loading_get_gardien = false
  les_gardiens: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_gardien()
      this.get_note()
  }
  init_form() {
    this.reactiveForm_add_gardien_note  = this.formBuilder.group({
    id_gardien: ["", Validators.required],
    id_note: ["", Validators.required],
    date_note: ["", Validators.required],
    commentaire: [""],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_gardien_note .controls; }
  // validation du formulaire
  onSubmit_add_gardien_note () {
      this.submitted = true;
      console.log(this.reactiveForm_add_gardien_note .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_gardien_note .invalid) {
          return;
      }
      var gardien_note =this.reactiveForm_add_gardien_note .value
      this.add_gardien_note (gardien_note )
  }
  // vider le formulaire
  onReset_add_gardien_note () {
      this.submitted = false;
      this.reactiveForm_add_gardien_note .reset();
  }
  add_gardien_note(gardien_note: any) {
      this.loading_add_gardien_note = true;
      this.api.taf_post("gardien_note/add", gardien_note, (reponse: any) => {
      this.loading_add_gardien_note = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table gardien_note. Réponse= ", reponse);
          this.onReset_add_gardien_note()
          alert("Opération éffectuée avec succés")
          this.cb_add_gardien_note.emit({
            status:true,
            gardien_note:reponse.data
          })
      } else {
          console.log("L'opération sur la table gardien_note a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_gardien_note = false;
    })
  }
  //liste des notes disponibles
  get_note() {
    this.loading_get_note = true;
    this.api.taf_post("note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_note = false;
    }, (error: any) => {
      this.loading_get_note = false;
    })
  }
  //liste des gerdiens 
  get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/get", {}, (reponse: any) => {
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
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }

  public ctrl = new FormControl(null, Validators.required);
  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

}

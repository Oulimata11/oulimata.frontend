
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  @Output()
  cb_add_note=new EventEmitter()
  reactiveForm_add_note !: FormGroup;
  submitted:boolean=false
  loading_add_note :boolean=false
  loading_get_gardien = false
  les_gardiens: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_gardien()
  }
  init_form() {
      this.reactiveForm_add_note  = this.formBuilder.group({
          
  id_gardien: ["", Validators.required],
  note: ["", Validators.required],
  commentaire: [""],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_note .controls; }
  // validation du formulaire
  onSubmit_add_note () {
      this.submitted = true;
      console.log(this.reactiveForm_add_note .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_note .invalid) {
          return;
      }
      var note = {
        id_utilisateur: this.api.token.user_connected.id_utilisateur,
        id_gardien: this.f.id_gardien.value, 
        note: this.f.note.value,
        commentaire: this.f.commentaire.value,
      }
      this.add_note (note )
  }
  // vider le formulaire
  onReset_add_note () {
      this.submitted = false;
      this.reactiveForm_add_note .reset();
  }
  add_note(note: any) {
      this.loading_add_note = true;
      this.api.taf_post("note/add", note, (reponse: any) => {
      this.loading_add_note = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table note. Réponse= ", reponse);
          this.onReset_add_note()
          this.cb_add_note.emit({status:true, note:reponse.data})
          this.api.Swal_success("Note ajouté avec succés")
      } else {
          console.log("L\'opération sur la table note a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
  }, (error: any) => {
      this.loading_add_note = false;
  })
}
 //liste des gardiens 
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

  
}

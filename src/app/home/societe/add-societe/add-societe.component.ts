
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss']
})
export class AddSocieteComponent {
  @Output()
  cb_add_societe=new EventEmitter()
  reactiveForm_add_societe !: FormGroup;
  submitted:boolean=false
  loading_add_societe :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
    this.reactiveForm_add_societe  = this.formBuilder.group({
    nom_societe: ["", Validators.required],
    description_societe: ["",],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_societe .controls; }
  // validation du formulaire
  onSubmit_add_societe () {
      this.submitted = true;
      console.log(this.reactiveForm_add_societe .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_societe .invalid) {
          return;
      }
      var societe =this.reactiveForm_add_societe .value
      this.add_societe (societe )
  }
  // vider le formulaire
  onReset_add_societe () {
      this.submitted = false;
      this.reactiveForm_add_societe .reset();
  }
  add_societe(societe: any) {
      this.loading_add_societe = true;
      this.api.taf_post("societe/add", societe, (reponse: any) => {
      this.loading_add_societe = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
          this.onReset_add_societe()
          this.api.Swal_success("Société ajoutée avec succés")
          this.cb_add_societe.emit({
            status:true,
            societe:reponse.data
          })
      } else {
          console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_societe = false;
    })
  }
  
}

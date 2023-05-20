
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  @Output()
  cb_add_client=new EventEmitter()
  reactiveForm_add_client !: FormGroup;
  submitted:boolean=false
  loading_add_client :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_client  = this.formBuilder.group({
          id_client: ["", Validators.required],
id_agent: ["", Validators.required],
longitude: ["", Validators.required],
lattitude: ["", Validators.required],
nom: ["", Validators.required],
prenom: ["", Validators.required],
telephone: ["", Validators.required],
adresse: ["", Validators.required],
created_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_client .controls; }
  // validation du formulaire
  onSubmit_add_client () {
      this.submitted = true;
      console.log(this.reactiveForm_add_client .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_client .invalid) {
          return;
      }
      var client =this.reactiveForm_add_client .value
      this.add_client (client )
  }
  // vider le formulaire
  onReset_add_client () {
      this.submitted = false;
      this.reactiveForm_add_client .reset();
  }
  add_client(client: any) {
      this.loading_add_client = true;
      this.api.taf_post("client/add", client, (reponse: any) => {
      this.loading_add_client = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table client. Réponse= ", reponse);
          this.onReset_add_client()
          alert("Opération éffectuée avec succés")
          this.cb_add_client.emit({
            status:true,
            client:reponse.data
          })
      } else {
          console.log("L'opération sur la table client a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_client = false;
    })
  }
  
}

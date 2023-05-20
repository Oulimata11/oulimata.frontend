
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  reactiveForm_edit_client !: FormGroup;
  submitted: boolean = false
  loading_edit_client: boolean = false
  @Input()
  client_to_edit: any = {}
  @Output()
  cb_edit_client=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.client_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_client  = this.formBuilder.group({
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
  // mise à jour du formulaire
  update_form(client_to_edit:any) {
      this.reactiveForm_edit_client = this.formBuilder.group({
          id_client: [client_to_edit.id_client, Validators.required],
id_agent: [client_to_edit.id_agent, Validators.required],
longitude: [client_to_edit.longitude, Validators.required],
lattitude: [client_to_edit.lattitude, Validators.required],
nom: [client_to_edit.nom, Validators.required],
prenom: [client_to_edit.prenom, Validators.required],
telephone: [client_to_edit.telephone, Validators.required],
adresse: [client_to_edit.adresse, Validators.required],
created_at: [client_to_edit.created_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_client .controls; }
  // validation du formulaire
  onSubmit_edit_client() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_client.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_client.invalid) {
          return;
      }
      var client = this.reactiveForm_edit_client.value
      this.edit_client({
      condition:JSON.stringify({id_client:this.client_to_edit.id_client}),
      data:JSON.stringify(client)
      })
  }
  // vider le formulaire
  onReset_edit_client() {
      this.submitted = false;
      this.reactiveForm_edit_client.reset();
  }
  edit_client(client: any) {
      this.loading_edit_client = true;
      this.api.taf_post("client/edit", client, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_client.emit({
                  new_data:JSON.parse(client.data)
              })
              console.log("Opération effectuée avec succés sur la table client. Réponse= ", reponse);
              this.onReset_edit_client()
              alert("Opération effectuée avec succés sur la table client")
          } else {
              console.log("L'opération sur la table client a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_client = false;
      }, (error: any) => {
          this.loading_edit_client = false;
      })
  }
}

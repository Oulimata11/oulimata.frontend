
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent {
  reactiveForm_edit_agent !: FormGroup;
  submitted: boolean = false
  loading_edit_agent: boolean = false
  @Input()
  agent_to_edit: any = {}
  @Output()
  cb_edit_agent=new EventEmitter()
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.agent_to_edit)
  }
  init_form() {
      this.reactiveForm_edit_agent  = this.formBuilder.group({
        prenom: ["", Validators.required],
nom: ["", Validators.required],
telephone: ["", Validators.required],
adresse: ["", Validators.required],
login: ["", Validators.required],
pwd: ["", Validators.required]
      });
  }
  // mise à jour du formulaire
  update_form(agent_to_edit:any) {
      this.reactiveForm_edit_agent = this.formBuilder.group({
          prenom: [agent_to_edit.prenom, Validators.required],
nom: [agent_to_edit.nom, Validators.required],
telephone: [agent_to_edit.telephone, Validators.required],
adresse: [agent_to_edit.adresse, Validators.required],
login: [agent_to_edit.login, Validators.required],
pwd: [agent_to_edit.pwd, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_agent .controls; }
  // validation du formulaire
  onSubmit_edit_agent() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_agent.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_agent.invalid) {
          return;
      }
      var agent = this.reactiveForm_edit_agent.value
      this.edit_agent({
      condition:JSON.stringify({id_agent:this.agent_to_edit.id_agent}),
      data:JSON.stringify(agent)
      })
  }
  // vider le formulaire
  onReset_edit_agent() {
      this.submitted = false;
      this.reactiveForm_edit_agent.reset();
  }
  edit_agent(agent: any) {
      this.loading_edit_agent = true;
      this.api.taf_post("agent/edit", agent, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_agent.emit({
                  new_data:JSON.parse(agent.data)
              })
              console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
              this.onReset_edit_agent()
              alert("Opération effectuée avec succés sur la table agent")
          } else {
              console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_agent = false;
      }, (error: any) => {
          this.loading_edit_agent = false;
      })
  }
}

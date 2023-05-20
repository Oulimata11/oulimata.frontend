
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
  @Output()
  cb_add_agent=new EventEmitter()
  reactiveForm_add_agent !: FormGroup;
  submitted:boolean=false
  loading_add_agent :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_agent  = this.formBuilder.group({
          prenom: ["", Validators.required],
nom: ["", Validators.required],
telephone: ["", Validators.required],
adresse: ["", Validators.required],
login: ["", Validators.required],
pwd: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_agent .controls; }
  // validation du formulaire
  onSubmit_add_agent () {
      this.submitted = true;
      console.log(this.reactiveForm_add_agent .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_agent .invalid) {
          return;
      }
      var agent =this.reactiveForm_add_agent .value
      this.add_agent (agent )
  }
  // vider le formulaire
  onReset_add_agent () {
      this.submitted = false;
      this.reactiveForm_add_agent .reset();
  }
  add_agent(agent: any) {
      this.loading_add_agent = true;
      this.api.taf_post("agent/add", agent, (reponse: any) => {
      this.loading_add_agent = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
          this.onReset_add_agent()
          alert("Opération éffectuée avec succés")
          this.cb_add_agent.emit({
            status:true,
            agent:reponse.data
          })
      } else {
          console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_agent = false;
    })
  }
  
}


import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-localisation',
  templateUrl: './add-localisation.component.html',
  styleUrls: ['./add-localisation.component.scss']
})
export class AddLocalisationComponent {
  @Output()
  cb_add_localisation=new EventEmitter()
  reactiveForm_add_localisation !: FormGroup;
  submitted:boolean=false
  loading_add_localisation :boolean=false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_localisation  = this.formBuilder.group({
          id_localisation: ["", Validators.required],
longitude_localisation: ["", Validators.required],
latitude_localisation: ["", Validators.required],
created_at: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_localisation .controls; }
  // validation du formulaire
  onSubmit_add_localisation () {
      this.submitted = true;
      console.log(this.reactiveForm_add_localisation .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_localisation .invalid) {
          return;
      }
      var localisation =this.reactiveForm_add_localisation .value
      this.add_localisation (localisation )
  }
  // vider le formulaire
  onReset_add_localisation () {
      this.submitted = false;
      this.reactiveForm_add_localisation .reset();
  }
  add_localisation(localisation: any) {
      this.loading_add_localisation = true;
      this.api.taf_post("localisation/add", localisation, (reponse: any) => {
      this.loading_add_localisation = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table localisation. Réponse= ", reponse);
          this.onReset_add_localisation()
          alert("Opération éffectuée avec succés")
          this.cb_add_localisation.emit({
            status:true,
            localisation:reponse.data
          })
      } else {
          console.log("L'opération sur la table localisation a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_localisation = false;
    })
  }
  
}

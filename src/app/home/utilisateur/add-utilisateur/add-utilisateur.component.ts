
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.scss']
})
export class AddUtilisateurComponent {
  @Output()
  cb_add_utilisateur=new EventEmitter()
  reactiveForm_add_utilisateur !: FormGroup;
  submitted:boolean=false
  loading_add_utilisateur :boolean=false
  loading_edit_role: boolean =false
  loading_get_utilisateur :boolean =false
  imageUrl: string = ""
  image_utilisateur: File
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.init_form()
      this.get_role()
  }
  init_form() {
    this.reactiveForm_add_utilisateur  = this.formBuilder.group({
        
        id_role: ["", Validators.required],
        matricule_utilisateur: [0],
        nom_utilisateur: ["", Validators.required],
        prenom_utilisateur: ["", Validators.required],
        date_naissance_utilisateur: ["", Validators.required],
        lieu_naissance_utilisateur: ["",],
        date_insertion_utilisateur: ["", Validators.required],
        telephone_utilisateur: ["", Validators.required],
        email_utilisateur: ["", Validators.required],
        password_utilisateur: ["", Validators.required],
    });
}
uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.image_utilisateur= event.target.files[0];
    }
  }
  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_utilisateur .controls; }
  // validation du formulaire
  onSubmit_add_utilisateur () {
      this.submitted = true;
      console.log(this.reactiveForm_add_utilisateur .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_utilisateur .invalid) {
          return;
      }
      const utilisateur = new FormData();
      if (this.image_utilisateur) {
        utilisateur.append("image_utilisateur", this.image_utilisateur, this.image_utilisateur.name);
      }
      utilisateur.append("id_role", this.f.id_role.value);
      utilisateur.append("matricule_utilisateur", this.f.matricule_utilisateur.value);
      utilisateur.append("nom_utilisateur", this.f.nom_utilisateur.value);
      utilisateur.append("prenom_utilisateur", this.f.prenom_utilisateur.value);
      utilisateur.append("date_naissance_utilisateur", this.f.date_naissance_utilisateur.value);
      utilisateur.append("lieu_naissance_utilisateur", this.f.lieu_naissance_utilisateur.value);
      utilisateur.append("date_insertion_utilisateur", this.f.date_insertion_utilisateur.value);
      utilisateur.append("telephone_utilisateur", this.f.telephone_utilisateur.value);
      utilisateur.append("email_utilisateur", this.f.email_utilisateur.value);
      utilisateur.append("password_utilisateur", this.f.password_utilisateur.value);
      this.add_utilisateur(utilisateur)
  }
  // vider le formulaire
  onReset_add_utilisateur () {
      this.submitted = false;
      this.reactiveForm_add_utilisateur .reset();
  }
  add_utilisateur(utilisateur: any) {
      this.loading_add_utilisateur = true;
      this.api.taf_post("utilisateur/add", utilisateur, (reponse: any) => {
      this.loading_add_utilisateur = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
          this.onReset_add_utilisateur()
          this.api.Swal_success("Utilisateur ajouté avec succés")
          this.cb_add_utilisateur.emit({status:true,utilisateur:reponse.data})
      } else {
          console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_utilisateur = false;
    })
  }
  get_role(){
    this.loading_edit_role = true;
    this.api.taf_get("role/get",(reponse:any)=>{
        //when success
        this.loading_edit_role = false;
        if(reponse.status){
          this.api.les_roles_des_utilisateurs=reponse.data
            console.log("Opération effectuée avec succés sur la table role. Réponse= ",reponse.data);
        }else{
            console.log("L\'opération sur la table role a échoué. Réponse= ",reponse);
        }
    },
    (error:any)=>{
        //when error
        this.loading_edit_role = false;
        console.log("Erreur inconnue! ",error);
    })
    }

}

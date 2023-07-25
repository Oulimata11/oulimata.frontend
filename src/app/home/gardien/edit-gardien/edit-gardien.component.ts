
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-edit-gardien',
  templateUrl: './edit-gardien.component.html',
  styleUrls: ['./edit-gardien.component.scss']
})
export class EditGardienComponent {
  reactiveForm_edit_gardien !: FormGroup;
  submitted: boolean = false
  loading_edit_gardien: boolean = false
  hasChange: boolean =false
  @Input()
  gardien_to_edit: any = {}
  @Output()
  cb_edit_gardien=new EventEmitter()
  imageUrl: any;
  image_gardien: File;
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.init_form()
      this.update_form(this.gardien_to_edit)
  }
  init_form() {
    this.reactiveForm_edit_gardien  = this.formBuilder.group({
        
nom_gardien: ["", Validators.required],
prenom_gardien: ["", Validators.required],
date_naissance_gardien: ["", Validators.required],
lieu_naissance_gardien: ["",],
date_insertion_gardien: ["", Validators.required],
telephone_gardien: ["", Validators.required],
email_gardien: ["",],
image_gardien: ["",],
});
}
  // mise à jour du formulaire
  update_form(gardien_to_edit:any) {
    this.reactiveForm_edit_gardien = this.formBuilder.group({
        
nom_gardien: [gardien_to_edit.nom_gardien, Validators.required],
prenom_gardien: [gardien_to_edit.prenom_gardien, Validators.required],
date_naissance_gardien: [gardien_to_edit.date_naissance_gardien, Validators.required],
lieu_naissance_gardien: [gardien_to_edit.lieu_naissance_gardien,],
date_insertion_gardien: [gardien_to_edit.date_insertion_gardien, Validators.required],
telephone_gardien: [gardien_to_edit.telephone_gardien, Validators.required],
email_gardien: [gardien_to_edit.email_gardien,],
image_gardien: [gardien_to_edit.image_gardien,],
});
}

uploadImage(event: any) {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.image_gardien= event.target.files[0];
  }
}
  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_gardien .controls; }
  // validation du formulaire
  onSubmit_edit_gardien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_gardien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_gardien.invalid) {
          return;
      }
      if(!this.check_change() && !this.image_gardien){
        alert("Il y'a pas eu de changement");
        return;
      }      const gardien =  new FormData() ; 
      if (this.image_gardien) {
        gardien.append("image_gardien", this.image_gardien, this.image_gardien.name);
      } else {
        gardien.append("image_gardien",this.gardien_to_edit.image_gardien);
      }     
        gardien.append("id_gardien", this.gardien_to_edit.id_gardien);
        gardien.append("nom_gardien", this.f.nom_gardien.value)
        gardien.append("prenom_gardien", this.f.prenom_gardien.value)
        gardien.append("date_naissance_gardien", this.f.date_naissance_gardien.value)
        gardien.append("lieu_naissance_gardien", this.f.lieu_naissance_gardien.value )
        gardien.append("date_insertion_gardien", this.f.date_insertion_gardien.value)
        gardien.append("telephone_gardien", this.f.telephone_gardien.value)
        gardien.append("email_gardien", this.f.email_gardien.value)
        console.log("gardien",gardien)
      this.edit_gardien(gardien)
      
  }
  // vider le formulaire
  onReset_edit_gardien() {
      this.submitted = false;
      this.reactiveForm_edit_gardien.reset();
  }
  edit_gardien(gardien: any) {
      this.loading_edit_gardien = true;
      this.api.taf_post("gardien/edit", gardien, (reponse: any) => {
          if (reponse.status) {
            let new_gardien = gardien; 
              new_gardien.id_gardien = this.gardien_to_edit.id_gardien;
              this.cb_edit_gardien.emit(gardien);
              console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", reponse);
              this.onReset_edit_gardien()
              this.api.Swal_success("Gardien modifié avec succés")
          } else {
              console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_gardien = false;
      }, (error: any) => {
          this.loading_edit_gardien = false;
      })
  }
     //determiner s'il y'a chagement au niveau du formulaire ou pas 
     check_change() : boolean {
        // retourne true s'il y'a changement et false sinon
        for (const [key, value] of Object.entries(this.reactiveForm_edit_gardien.value)) {
          if (this.gardien_to_edit[key] != value) {
            // il y'a eu un changement
            return true;
          }
        }
        return false;
      }
}

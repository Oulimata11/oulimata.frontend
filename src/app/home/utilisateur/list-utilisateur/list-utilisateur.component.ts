import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent {
  loading_get_utilisateur = false
  selected_utilisateur: any = undefined
  utilisateur_to_edit: any = undefined
  constructor(public api: ApiService,private modalService:NgbModal) {

  }
  ngOnInit(): void {
    this.get_utilisateur()
  }
  get_utilisateur() {
    this.loading_get_utilisateur = true;
    this.api.taf_post("utilisateur/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.api.les_utilisateurs = reponse.data
        this.api.les_utilisateurs=this.api.les_utilisateurs.map(user =>{
          const statut_compte= user.statut_utilisateur == 1 ? "Actif" : "Inactif";
          return {...user,statut_compte};
        });
        console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", this.api.les_utilisateurs);
      } else {
        console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_utilisateur = false;
    }, (error: any) => {
      this.loading_get_utilisateur = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.api.les_utilisateurs.unshift(event.utilisateur)
      this.get_utilisateur()
    } else {

    }
  }
  after_edit(params: any) {
    this.api.les_utilisateurs[this.api.les_utilisateurs.indexOf(this.utilisateur_to_edit)]=params.new_data;
    this.modalService.dismissAll()
  }
  voir_plus(one_utilisateur: any) {
    this.selected_utilisateur = one_utilisateur
  }
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  open_modal_edit(modal_edit, un_utilisateur: any) {
    this.utilisateur_to_edit = un_utilisateur;
    this.modalService.open(modal_edit, {
      centered: true,
    });
  }
}
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
  loading_desactiver_compte =false
  loading_activer_compte =false
  selected_utilisateur: any = undefined
  utilisateur_to_edit: any = undefined
  user_disable :any =undefined
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
      this.modalService.dismissAll()
    } else {

    }
  }
  after_edit(params: any) {
    this.api.les_utilisateurs[this.api.les_utilisateurs.indexOf(this.utilisateur_to_edit)]=params.new_data;
    this.modalService.dismissAll()
    this.get_utilisateur()
  }
  voir_plus(one_utilisateur: any) {
    this.selected_utilisateur = one_utilisateur
  }
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  open_modal_desactiver_compte(modal_desactiver_compte, user: any) {
    this.user_disable = user;
    this.modalService.open(modal_desactiver_compte, {
      centered: true,
    });
  }
  //Désactiver un compte
  desactiver_compte() {
    this.loading_desactiver_compte = true;
    this.api.taf_post(
      "utilisateur/disable_user",
      { id_utilisateur: this.user_disable.id_utilisateur },
      (reponse: any) => {
        this.loading_desactiver_compte  = false;
        if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ",reponse);
          this.api.Swal_success("Compte désactivé avec succés!");
          this.get_utilisateur();
          this.modalService.dismissAll();
        } else {
          console.log(
            "L'opération sur la table utilisateur a échoué. Réponse= ",
            reponse
          );
          alert("La tentative de désactivation du compte a echoué");
        }
      },
      (error: any) => {
        this.loading_desactiver_compte = false;
      }
    );
  }
  //Activer un compte
  activer_compte(user_enable: any) {
    this.loading_activer_compte = true;
    this.api.taf_post(
      "utilisateur/enable_user",
      { id_utilisateur: user_enable.id_utilisateur },
      (reponse: any) => {
        this.loading_activer_compte  = false;
        if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ",reponse);
          this.api.Swal_success("Compte activé avec succés!");
          this.get_utilisateur();
        } else {
          console.log(
            "L'opération sur la table utilisateur a échoué. Réponse= ",
            reponse
          );
          alert("La tentative d'activation du compte a echoué");
        }
      },
      (error: any) => {
        this.loading_activer_compte = false;
      }
    );
  }
}
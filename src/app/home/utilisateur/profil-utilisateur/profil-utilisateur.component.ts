import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.scss']
})
export class ProfilUtilisateurComponent implements OnInit {

  loading_get_utilisateur = false
  user:any 
  constructor(public api: ApiService,private modalService:NgbModal) {}
  ngOnInit(): void {
    console.log("utilisateur connecté",this.api.token.token_decoded.taf_data)
    this.get_utilisateur(this.api.token.token_decoded.taf_data.id_utilisateur)
  }
  get_utilisateur(id_utilisateur:number) {
    this.loading_get_utilisateur = true;
    this.api.taf_post("utilisateur/profil", {id_utilisateur : id_utilisateur}, (reponse: any) => {
      if (reponse.status) {
        this.user= reponse.data[0]
        console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ",reponse);
      } else {
        console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_utilisateur = false;
    }, (error: any) => {
      this.loading_get_utilisateur = false;
    })
  }
}

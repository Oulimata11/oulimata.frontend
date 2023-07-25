import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
import { get } from 'http';

@Component({
  selector: 'app-detail-gardien',
  templateUrl: './detail-gardien.component.html',
  styleUrls: ['./detail-gardien.component.scss']
})
export class DetailGardienComponent implements OnInit {
  loading_get_gardien = false
  un_gardien: any = undefined
  detail_conge: any= undefined
  detail_indemnite: any= undefined
  detail_note: any= undefined
  detail_absence: any= undefined
  @Input()
  gardien_detail: any = undefined
  path_backend = this.api.taf_base_url + "images/"
  public isCollapsed5 = true;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.get_gardien()
    this.get_conges()
    this.get_indemnite()
    this.get_evaluation()
    this.get_absence()
  }
  get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/detail", { id: this.gardien_detail.id_gardien }, (reponse: any) => {
      if (reponse.status) {
        this.un_gardien = reponse.data[0]
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.un_gardien);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }
  //les conges 
  get_conges() {
    this.loading_get_gardien = true;
    this.api.taf_post("conges/get_nb_conge", { id_gardien: this.gardien_detail.id_gardien }, (reponse: any) => {
      if (reponse.status) {
        this.detail_conge = reponse.data[0]
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.detail_conge);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }
  //les indemnites
  get_indemnite() {
    this.api.taf_post("indemnite_gardien/get_nb_indemnite", { id_gardien: this.gardien_detail.id_gardien }, (reponse: any) => {
      if (reponse.status) {
        this.detail_indemnite = reponse.data[0]
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.detail_indemnite);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
    })
  }
  //les notes
  get_evaluation() {
      this.api.taf_post("note/get_moyenne", { id_gardien: this.gardien_detail.id_gardien }, (reponse: any) => {
        if (reponse.status) {
          this.detail_note = reponse.data[0]
          console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.detail_note);
        } else {
          console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
      }, (error: any) => {
      })
    }
   //les absences
  get_absence() {
    this.api.taf_post("absence/get_nb_absence", { id_gardien: this.gardien_detail.id_gardien }, (reponse: any) => {
      if (reponse.status) {
        this.detail_absence = reponse.data[0]
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.detail_absence);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
    })
  }
}

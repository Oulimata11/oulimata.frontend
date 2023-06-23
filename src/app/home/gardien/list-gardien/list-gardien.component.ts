import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';

@Component({
  selector: 'app-list-gardien',
  templateUrl: './list-gardien.component.html',
  styleUrls: ['./list-gardien.component.scss']
})
export class ListGardienComponent {
  loading_get_gardien = false
  loading_delete_gardien =false
  les_gardiens: any[] = []
  selected_gardien: any = undefined
  gardien_to_edit: any = undefined
  gardien_to_delete :any = undefined
  gardien_detail : any =undefined
  searchText : any 

  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_gardien()
  }
  get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens = reponse.data
        this.les_gardiens=this.les_gardiens.map(gardien => {
          var statut= gardien.statut_gardien == 1 ? "Actif" : "Inactif";
          var affectation =gardien.id_societe == null ? "Pas Affecté" : "Affecté"
          return {...gardien,statut,affectation}
        })
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_gardiens.unshift(event.gardien)
      this.get_gardien()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_gardiens[this.les_gardiens.indexOf(this.gardien_to_edit)]=params.new_data
    this.get_gardien();
    this.modalService.dismissAll()
  }
  //add-gardien
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  //edit-gardien
  open_modal_edit(modal:any, one_gardien: any){
    this.gardien_to_edit = one_gardien
    this.modalService.open(modal, {
      centered: true
    });
  }
  //delete-gardien
  open_madal_delete( modal:any , one_gardien: any){
    this.gardien_to_delete = one_gardien
    this.modalService.open(modal, {
      centered: true
    });
  }
  //detail-gardien
  open_madal_detail( modal:any , one_gardien: any){
    this.gardien_detail= one_gardien
    this.modalService.open(modal, {
      centered: true
    });
  }
  //foction qui supprime un gardien 
  delete_gardien (){
    this.loading_delete_gardien = true;
    this.api.taf_post("gardien/delete",{id:this.gardien_to_delete.id_gardien},(reponse: any)=>{
        //when success
    this.loading_delete_gardien = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table gardien . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_gardien()
        }else{
        console.log("L\'opération sur la table gardien  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_gardien = true;
        console.log("Erreur inconnue! ",error)
    })
    }

}
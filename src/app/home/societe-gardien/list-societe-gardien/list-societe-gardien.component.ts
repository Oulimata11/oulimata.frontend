import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-societe-gardien',
  templateUrl: './list-societe-gardien.component.html',
  styleUrls: ['./list-societe-gardien.component.scss']
})
export class ListSocieteGardienComponent {
  loading_get_societe_gardien = false
  loading_delete_societe_gardien = false
  les_societe_gardiens: any[] = []
  selected_societe_gardien: any = undefined
  societe_gardien_to_edit: any = undefined
  societe_gardien_to_delete : any = undefined
  
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_societe_gardien()
  }
  get_societe_gardien() {
    this.loading_get_societe_gardien = true;
    this.api.taf_post("societe_gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_societe_gardiens = reponse.data
        console.log("Opération effectuée avec succés sur la table societe_gardien. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table societe_gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_societe_gardien = false;
    }, (error: any) => {
      this.loading_get_societe_gardien = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_societe_gardiens.unshift(event.societe_gardien)
      this.get_societe_gardien()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_societe_gardiens[this.les_societe_gardiens.indexOf(this.societe_gardien_to_edit)]=params.new_data
    this.get_societe_gardien()
    this.modalService.dismissAll()
  }
  //add-affectation
  open_modal_add_affectation(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }

//edit-affectation
open_modal_edit_affectation(modal:any, one_societe_gardien: any){
  this.societe_gardien_to_edit = one_societe_gardien
  this.modalService.open(modal, {
    centered: true
  });
}
  //delete-affectation
  open_modal_delete( modal:any , one_societe_gardien: any){
    this.societe_gardien_to_delete = one_societe_gardien
    this.modalService.open(modal, {
      centered: true
    });
  }
  //fonction qui supprime une affectation 
  delete_affectation (){
    this.loading_delete_societe_gardien = true;
    this.api.taf_post("societe_gardien/delete",{id:this.societe_gardien_to_delete.id_societe_gardien},(reponse: any)=>{
        //when success
    this.loading_delete_societe_gardien = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table gardien . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_societe_gardien()
        }else{
        console.log("L\'opération sur la table gardien  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_societe_gardien = true;
        console.log("Erreur inconnue! ",error)
    })
    }
 
}
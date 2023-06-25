import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-indemnite-gardien',
  templateUrl: './list-indemnite-gardien.component.html',
  styleUrls: ['./list-indemnite-gardien.component.scss']
})
export class ListIndemniteGardienComponent {
  loading_get_indemnite_gardien = false
  loading_delete_indemnite_gardien = false
  les_indemnite_gardiens: any[] = []
  selected_indemnite_gardien: any = undefined
  indemnite_gardien_to_edit: any = undefined
  indemnite_gardien_to_delete  : any = undefined
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_indemnite_gardien()
  }
  get_indemnite_gardien() {
    this.loading_get_indemnite_gardien = true;
    this.api.taf_post("indemnite_gardien/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_indemnite_gardiens = reponse.data
        console.log("Opération effectuée avec succés sur la table indemnite_gardien. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table indemnite_gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_indemnite_gardien = false;
    }, (error: any) => {
      this.loading_get_indemnite_gardien = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_indemnite_gardiens.unshift(event.indemnite_gardien)
      this.get_indemnite_gardien()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_indemnite_gardiens[this.les_indemnite_gardiens.indexOf(this.indemnite_gardien_to_edit)]=params.new_data
    this.get_indemnite_gardien()
    this.modalService.dismissAll()
  }
  //add-indemnite-gardien
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  //edit-indemnite-gardien
   open_modal_edit(modal:any, one_indemnite_gardien: any){
    this.indemnite_gardien_to_edit = one_indemnite_gardien
    this.modalService.open(modal, {
      centered: true
    });
  }
   //delete-indemnite_gardien 
   open_modal_delete( modal:any ,  one_indemnite_gardien: any){
    this.indemnite_gardien_to_delete = one_indemnite_gardien
    this.modalService.open(modal, {
      centered: true
    });
    console.log("les donnes a supprimes ", this.indemnite_gardien_to_delete)
  }
  //fonction qui supprime un indemnite_gardien  
  delete_indemnite_gardien  (){
    this.loading_delete_indemnite_gardien = true;
    this.api.taf_post("indemnite_gardien/delete",{id:this.indemnite_gardien_to_delete.id_i_g },(reponse: any)=>{
        //when success
    this.loading_delete_indemnite_gardien  = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table indemnite_gardien  . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_indemnite_gardien ()
        }else{
        console.log("L\'opération sur la table indemnite_gardien   a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_indemnite_gardien  = true;
        console.log("Erreur inconnue! ",error)
    })
    }
}
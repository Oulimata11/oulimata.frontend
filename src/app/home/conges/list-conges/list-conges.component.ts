import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-conges',
  templateUrl: './list-conges.component.html',
  styleUrls: ['./list-conges.component.scss']
})
export class ListCongesComponent {
  loading_get_conges = false
  loading_delete_conges =false
  les_conges: any[] = []
  selected_conges: any = undefined
  conges_to_edit: any = undefined
  conges_to_delete : any =undefined
  search :''
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_conges()
  }
  get_conges() {
    this.loading_get_conges = true;
    this.api.taf_post("conges/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_conges = reponse.data
        console.log("Opération effectuée avec succés sur la table conges. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table conges a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_conges = false;
    }, (error: any) => {
      this.loading_get_conges = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_conges.unshift(event.conges)
      this.get_conges()
      this.modalService.dismissAll()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_conges[this.les_conges.indexOf(this.conges_to_edit)]=params.new_data
    this.get_conges();
    this.modalService.dismissAll()
  }
   //add-conges
   open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  //edit-conges
  open_modal_edit(modal:any, one_conges: any){
    this.conges_to_edit = one_conges
    this.modalService.open(modal, {
      centered: true
    });
  }
  //delete-conges
  open_modal_delete( modal:any , one_conges: any){
    this.conges_to_delete = one_conges
    this.modalService.open(modal, {
      centered: true
    });
  }
  //fonction qui supprime un conges 
  delete_conges (){
    this.loading_delete_conges = true;
    this.api.taf_post("conges/delete",{id:this.conges_to_delete.id_conges},(reponse: any)=>{
        //when success
    this.loading_delete_conges = false;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table conges . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_conges()
        }else{
        console.log("L\'opération sur la table conges  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_conges = false;
        console.log("Erreur inconnue! ",error)
    })
  }
   //recherche 
   recherche_change() {
    this.les_conges= this.les_conges
      .filter((un_conges: any) => {
        return (un_conges.prenom_gardien + un_conges.nom_gardien)
        .toLowerCase()
        .includes(this.search.toLowerCase().replace(/\s/g, ''))
      })
}
}
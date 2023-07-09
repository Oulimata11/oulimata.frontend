import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-societe',
  templateUrl: './list-societe.component.html',
  styleUrls: ['./list-societe.component.scss']
})
export class ListSocieteComponent {
  loading_get_societe = false
  loading_delete_societe  =false
  les_societes: any[] = []
  selected_societe: any = undefined
  societe_to_edit: any = undefined
  societe_to_delete :any =undefined
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_societe()
  }
  get_societe() {
    this.loading_get_societe = true;
    this.api.taf_post("societe/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_societes = reponse.data
        console.log("Opération effectuée avec succés sur la table societe. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table societe a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_societe = false;
    }, (error: any) => {
      this.loading_get_societe = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_societes.unshift(event.societe)
      this.get_societe()
      this.modalService.dismissAll()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_societes[this.les_societes.indexOf(this.societe_to_edit)]=params.new_data
    this.modalService.dismissAll();
    this.get_societe();
  }
  voir_plus(one_societe: any) {
    this.selected_societe = one_societe
  }
  //add-collaborateurs
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
    //edit-collaborateurs
    open_modal_edit(modal:any, one_societe: any){
      this.societe_to_edit = one_societe
      this.modalService.open(modal, {
        centered: true
      });
    }
    //delete-societe
    open_modal_delete( modal:any , one_societe: any){
      this.societe_to_delete = one_societe
      this.modalService.open(modal, {
        centered: true
      });
    }
  //foction qui supprime un societe 
  delete_societe (){
    this.loading_delete_societe = true;
    this.api.taf_post("societe/delete",{id:this.societe_to_delete.id_societe},(reponse: any)=>{
        //when success
    this.loading_delete_societe = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table societe . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_societe()
        }else{
        console.log("L\'opération sur la table societe  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_societe = true;
        console.log("Erreur inconnue! ",error)
    })
    }
}
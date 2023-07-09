import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss']
})
export class ListAbsenceComponent {
  loading_get_absence = false
  les_absences: any[] = []
  selected_absence: any = undefined
  absence_to_edit: any = undefined
  absence_to_delete: any=undefined;
  loading_delete_absence: boolean =false;
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_absence()
  }
  get_absence() {
    this.loading_get_absence = true;
    this.api.taf_post("absence/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_absences = reponse.data
        console.log("Opération effectuée avec succés sur la table absence. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table absence a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_absence = false;
    }, (error: any) => {
      this.loading_get_absence = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_absences.unshift(event.absence)
      this.get_absence()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_absences[this.les_absences.indexOf(this.absence_to_edit)]=params.new_data
    this.get_absence()
    this.modalService.dismissAll()
  }
  voir_plus(one_absence: any) {
    this.selected_absence = one_absence
  }
  on_click_edit(one_absence: any) {
    this.absence_to_edit = one_absence
  }
  on_close_modal_edit(){
    this.absence_to_edit=undefined
  }
     //add-absence
  open_modal(modal:any){
      this.modalService.open(modal, {
        centered: true
      });
  }//edit-absence
  open_modal_edit(modal:any, one_absence: any){
    this.absence_to_edit = one_absence
    this.modalService.open(modal, {
      centered: true
    });
  }
  //delete-absence
  open_modal_delete( modal:any , one_absence: any){
    this.absence_to_delete = one_absence
    this.modalService.open(modal, {
      centered: true
    });
  }
  //fonction qui supprime une absence 
  delete_absence (){
    this.loading_delete_absence = true;
    this.api.taf_post("absence/delete",{id:this.absence_to_delete.id_absence},(reponse: any)=>{
        //when success
    this.loading_delete_absence = false;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table absence . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_absence()
        }else{
        console.log("L\'opération sur la table absence  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_absence = false;
        console.log("Erreur inconnue! ",error)
    })
    }
}
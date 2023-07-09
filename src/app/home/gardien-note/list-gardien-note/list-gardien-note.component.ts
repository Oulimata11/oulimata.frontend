import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-gardien-note',
  templateUrl: './list-gardien-note.component.html',
  styleUrls: ['./list-gardien-note.component.scss']
})
export class ListGardienNoteComponent {
  loading_get_gardien_note = false
  les_gardiens_notes: any[] = []
  selected_gardien_note: any = undefined
  gardien_note_to_edit: any = undefined
  gardien_note_to_delete : any =undefined
  loading_delete_gardien_note: boolean =false;
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_gardien_note()
  }
  get_gardien_note() {
    this.loading_get_gardien_note = true;
    this.api.taf_post("gardien_note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table gardien_note. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table gardien_note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien_note = false;
    }, (error: any) => {
      this.loading_get_gardien_note = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_gardiens_notes.unshift(event.gardien_note)
      this.get_gardien_note()
      this.modalService.dismissAll()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_gardiens_notes[this.les_gardiens_notes.indexOf(this.gardien_note_to_edit)]=params.new_data;
    this.get_gardien_note();
    this.modalService.dismissAll()
  }
  //add-gardien
  open_modal_add_note(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
   //edit-gardien
   open_modal_edit_note(modal:any, one_gardien_note: any){
    this.gardien_note_to_edit = one_gardien_note
    this.modalService.open(modal, {
      centered: true
    });
  }
  //delete-gardien
  open_modal_delete_note( modal:any , one_gardien_note: any){
    this.gardien_note_to_delete = one_gardien_note
    this.modalService.open(modal, {
      centered: true
    });
  }
  //foction qui supprime un gardien 
  delete_gardien_note (){
    this.loading_delete_gardien_note = true;
    this.api.taf_post("gardien_note/delete",{id:this.gardien_note_to_delete.id_gardien_note},(reponse: any)=>{
        //when success
    this.loading_delete_gardien_note = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table gardien . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_gardien_note()
        }else{
        console.log("L\'opération sur la table gardien  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_gardien_note = true;
        console.log("Erreur inconnue! ",error)
    })
    }

}
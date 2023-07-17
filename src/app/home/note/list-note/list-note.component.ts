import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.scss']
})
export class ListNoteComponent {
  loading_get_note = false
  loading_delete_note = false
  les_notes: any[] = []
  note_to_edit: any = undefined
  note_to_delete: any = undefined
  constructor(public api: ApiService,private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.get_note()
  }
  get_note() {
    this.loading_get_note = true;
    this.api.taf_post("note/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_notes = reponse.data
        console.log("Opération effectuée avec succés sur la table note. Réponse= ", this.les_notes);
      } else {
        console.log("L'opération sur la table note a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_note = false;
    }, (error: any) => {
      this.loading_get_note = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_notes.unshift(event.note)
      this.modalService.dismissAll()
      this.get_note()
    } else {

    }
  }
  after_edit(params: any) {
    this.les_notes[this.les_notes.indexOf(this.note_to_edit)]=params.new_data
    this.modalService.dismissAll()
    this.get_note()
  }
  //add-gardien
  open_modal_add_note(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
   //edit-gardien
   open_modal_edit_note(modal:any, one_note: any){
    this.note_to_edit = one_note
    this.modalService.open(modal, {
      centered: true
    });
  }
  //delete-gardien
  open_modal_delete_note( modal:any , one_note: any){
    this.note_to_delete = one_note
    this.modalService.open(modal, {
      centered: true
    });
    console.log("les notes ", this.note_to_delete)
  }
   //foction qui supprime un gardien 
   delete_note (){
    this.loading_delete_note = true;
    this.api.taf_post("note/delete",{id_note:this.note_to_delete.id_note},(reponse: any)=>{
        //when success
    this.loading_delete_note = true;
        if(reponse.status){
        console.log("Opération effectuée avec succés sur la table gardien . Réponse = ",reponse)
        this.api.Swal_success("Suppression effectuée avec succes ! ")
        this.modalService.dismissAll()
        this.get_note()
        }else{
        console.log("L\'opération sur la table gardien  a échoué. Réponse = ",reponse)
        }
    },
    (error: any)=>{
        //when error
    this.loading_delete_note = true;
        console.log("Erreur inconnue! ",error)
    })
    }
}
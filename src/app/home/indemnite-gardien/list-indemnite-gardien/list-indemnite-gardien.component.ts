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
  les_indemnite_gardiens: any[] = []
  selected_indemnite_gardien: any = undefined
  indemnite_gardien_to_edit: any = undefined
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
    } else {

    }
  }
  after_edit(params: any) {
    this.les_indemnite_gardiens[this.les_indemnite_gardiens.indexOf(this.indemnite_gardien_to_edit)]=params.new_data
  }
  voir_plus(one_indemnite_gardien: any) {
    this.selected_indemnite_gardien = one_indemnite_gardien
  }
  on_click_edit(one_indemnite_gardien: any) {
    this.indemnite_gardien_to_edit = one_indemnite_gardien
  }
  on_close_modal_edit(){
    this.indemnite_gardien_to_edit=undefined
  }
  //add-indemnite-gardien
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
}
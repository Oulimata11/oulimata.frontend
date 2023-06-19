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
  les_gardiens: any[] = []
  selected_gardien: any = undefined
  gardien_to_edit: any = undefined
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
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", reponse);
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
    } else {

    }
  }
  after_edit(params: any) {
    this.les_gardiens[this.les_gardiens.indexOf(this.gardien_to_edit)]=params.new_data
  }
  voir_plus(one_gardien: any) {
    this.selected_gardien = one_gardien
  }
  open_modal(modal:any){
    this.modalService.open(modal, {
      centered: true
    });
  }
  on_click_edit(one_gardien: any) {
    this.gardien_to_edit = one_gardien
  }
  on_close_modal_edit(){
    this.gardien_to_edit=undefined
  }
}
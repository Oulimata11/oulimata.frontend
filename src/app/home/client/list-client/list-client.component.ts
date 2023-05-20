import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  loading_get_client = false
  les_clients: any[] = []
  selected_client: any = undefined
  client_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_client()
  }
  get_client() {
    this.loading_get_client = true;
    this.api.taf_post("client/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_clients = reponse.data
        console.log("Opération effectuée avec succés sur la table client. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table client a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_client = false;
    }, (error: any) => {
      this.loading_get_client = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_clients.unshift(event.client)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_clients[this.les_clients.indexOf(this.client_to_edit)]=params.new_data
  }
  voir_plus(one_client: any) {
    this.selected_client = one_client
  }
  on_click_edit(one_client: any) {
    this.client_to_edit = one_client
  }
  on_close_modal_edit(){
    this.client_to_edit=undefined
  }
}
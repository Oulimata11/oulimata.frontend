import { Component } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent {
  loading_get_role = false
  les_roles: any[] = []
  selected_role: any = undefined
  role_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_role()
  }
  get_role() {
    this.loading_get_role = true;
    this.api.taf_post("role/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_roles = reponse.data
        console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_role = false;
    }, (error: any) => {
      this.loading_get_role = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_roles.unshift(event.role)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_roles[this.les_roles.indexOf(this.role_to_edit)]=params.new_data
  }
  voir_plus(one_role: any) {
    this.selected_role = one_role
  }
  on_click_edit(one_role: any) {
    this.role_to_edit = one_role
  }
  on_close_modal_edit(){
    this.role_to_edit=undefined
  }
}
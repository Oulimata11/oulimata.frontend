import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent {
  loading_get_agent = false
  les_agents: any[] = []
  selected_agent: any = undefined
  agent_to_edit: any = undefined
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_agent()
  }
  get_agent() {
    this.loading_get_agent = true;
    this.api.taf_post("agent/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_agents = reponse.data
        console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_agent = false;
    }, (error: any) => {
      this.loading_get_agent = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_agents.unshift(event.agent)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_agents[this.les_agents.indexOf(this.agent_to_edit)]=params.new_data
  }
  voir_plus(one_agent: any) {
    this.selected_agent = one_agent
  }
  on_click_edit(one_agent: any) {
    this.agent_to_edit = one_agent
  }
  on_close_modal_edit(){
    this.agent_to_edit=undefined
  }
}
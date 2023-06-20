import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api/api.service';

@Component({
  selector: 'app-detail-gardien',
  templateUrl: './detail-gardien.component.html',
  styleUrls: ['./detail-gardien.component.scss']
})
export class DetailGardienComponent implements OnInit {
  loading_get_gardien = false
  les_gardiens: any[] = []
  @Input()
  gardien_detail : any = undefined

  public isCollapsed5 = true;
  
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.get_gardien()
  }
  get_gardien() {
    this.loading_get_gardien = true;
    this.api.taf_post("gardien/detail", {id: this.gardien_detail.id_gardien}, (reponse: any) => {
      if (reponse.status) {
        this.les_gardiens = reponse.data
        console.log("Opération effectuée avec succés sur la table gardien. Réponse= ", this.les_gardiens);
      } else {
        console.log("L'opération sur la table gardien a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_gardien = false;
    }, (error: any) => {
      this.loading_get_gardien = false;
    })
  }
}

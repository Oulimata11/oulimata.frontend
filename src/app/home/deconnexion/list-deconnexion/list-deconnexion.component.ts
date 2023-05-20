import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-deconnexion',
  templateUrl: './list-deconnexion.component.html',
  styleUrls: ['./list-deconnexion.component.css']
})
export class ListDeconnexionComponent {
  constructor(private _location: Location,public api:ApiService,private route:Router) { }

  backClicked() {
    this._location.back();
  }
  async deconnexion() {
    await this.api.delete_from_local_storage("token")
    this.api.network = {
      token: undefined,
      status: true,
      message: "Aucun probléme détecté",
    }
    this.api.token = {
      token_key: null,
      token_decoded: null,
      user_connected: null,
      is_expired: null,
      date_expiration: null
    }
    this.route.navigate(['/'])
  }
}
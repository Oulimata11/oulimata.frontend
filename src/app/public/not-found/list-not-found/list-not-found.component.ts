import { Component } from '@angular/core';
import {Location} from '@angular/common';
  
@Component({
  selector: 'app-list-not-found',
  templateUrl: './list-not-found.component.html',
  styleUrls: ['./list-not-found.component.css']
})
export class ListNotFoundComponent {
  constructor(private _location: Location){

  }

  backClicked() {
    this._location.back();
  }
}
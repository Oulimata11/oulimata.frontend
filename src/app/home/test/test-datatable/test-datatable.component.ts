import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';

import { locale as german } from './i18n/de';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { locale as portuguese } from './i18n/pt';

import * as snippet from './datatables.snippetcode';

import { DatatablesService } from './datatables.service';
@Component({
  selector: 'app-test-datatable',
  templateUrl: './test-datatable.component.html',
  styleUrls: ['./test-datatable.component.scss'],
  providers: [DatatablesService]
})
export class TestDatatableComponent implements OnInit {


  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData: any;
  table: any
  exportCSVData: any
  rows: any
  _unsubscribeAll: any
  constructor(private _datatablesService: DatatablesService) {

  }
  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });
  }


}

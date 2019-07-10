import { Component, OnInit } from '@angular/core';
import {DataService} from '../app-data.service';

@Component({
  selector: 'app-quick-start',
  templateUrl: './quick-start.component.html'
})
export class QuickStartComponent implements OnInit {
  spreadBackColor = 'aliceblue';
  sheetName = 'Person Address';
  hostStyle = {
    top: '200px',
    bottom: '10px'
  };
  data: any;
  autoGenerateColumns = false;

  constructor(private dataservice: DataService) {
    this.data = dataservice.getPersonAddressData();
  }

  ngOnInit() {
  }

}

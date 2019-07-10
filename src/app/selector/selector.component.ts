import {Component, OnInit} from '@angular/core';
import * as GC from '@grapecity/spread-sheets/dist/GC.Spread.Sheets';

interface dataDef {
  company: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})

export class SelectorComponent implements OnInit {

  constructor() {
  }
  rowHeaderVisible = false;
  autoGenerateColumns = false;
  sheetName = 'Adress Book';

  private spread: GC.Spread.Sheets.Workbook;
  private activeSheet;
  private rows;
  private widths: string[] = [];

  hostStyle = {
    top: '120px',
    bottom: '800px'
  };

  data: Array<dataDef> = [
    {company: 'APT Treuhand', firstName: 'Alice', lastName: 'Müller'},
    {company: 'ABB', firstName: 'Aimee', lastName: 'Forster'},
    {company: 'Simens', firstName: 'Lukas', lastName: 'Petermann'},
    {company: 'Roche', firstName: 'Fred', lastName: 'Feuerstein'},
    {company: 'Novartis', firstName: 'Peter', lastName: 'Pan'},
    {company: 'KWC', firstName: 'Hans', lastName: 'Gerber'},
    {company: 'Müller Martini', firstName: 'Lucky', lastName: 'Luke'}
  ];

  ngOnInit() {
  }

  onColumnWidthChanged(args) {
    this.rows = this.activeSheet.getColumnCount();
    for (let i = 0; i < this.rows; i++) {
      const width = this.activeSheet.getColumnWidth(i) - 10;
      this.widths[i] = width + 'px';
      console.log(this.widths[i]);
    }

    // rows.forEach((element => console.log(element)));

    // console.log(JSON.stringify(args));
    // console.log("ColumnWidthChanged " + JSON.stringify(args));
    // let activeSheet = JSON.stringify(args.sheetName);
    // let rows = Array.of(args.colList);
    // console.log(rows.forEach(element => console.log(element)));

    // console.log(activeSheet.getColumnWidth(row));
    // console.log(activeSheet.getColumnWidth(1));

    // let tsheet = Array.of(args.sheet.toJSON().columns);
    // tsheet.forEach(ele => console.log(Object.keys(ele[0])));
  }

  workbookInit(args) {
    this.spread = args.spread;
    this.activeSheet = this.spread.getActiveSheet();
    this.rows = this.activeSheet.getColumnCount();
    for (let i = 0; i < this.rows; i++) {
      const width = this.activeSheet.getColumnWidth(i) - 10;
      this.widths[i] = width + 'px';
      console.log(this.widths[i]);
    }
  }

}

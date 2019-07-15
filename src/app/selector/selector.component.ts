import {Component, OnInit} from '@angular/core';
import * as GC from '@grapecity/spread-sheets/dist/GC.Spread.Sheets';
import {stringify} from '@angular/compiler/src/util';
import IColumnWidthChangedEventArgs = GC.Spread.Sheets.IColumnWidthChangedEventArgs;
import ILeftColumnChangedEventArgs = GC.Spread.Sheets.ILeftColumnChangedEventArgs;
import IActiveSheetChangedEventArgs = GC.Spread.Sheets.IActiveSheetChangedEventArgs;
import IColumnChangedEventArgs = GC.Spread.Sheets.IColumnChangedEventArgs;

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
  private rows;
  private columnWidths: string[] = [];
  private leftColumn = 0;
  private rightColumn = 0;

  hostStyle = {
    top: '140px',
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

  onColumnWidthChanged($event: IColumnWidthChangedEventArgs) {
    this.getColumnsWidth($event.sheet);

    // console.log(JSON.stringify(args));
    // console.log("ColumnWidthChanged " + JSON.stringify(args));
    // let activeSheet = JSON.stringify(args.sheetName);
    // let rows = Array.of(args.colList);
    // console.log(rows.forEach(element => console.log(element)));

    // let tsheet = Array.of(args.sheet.toJSON().columns);
    // tsheet.forEach(ele => console.log(Object.keys(ele[0])));
  }

  onLeftColumnChanged($event: ILeftColumnChangedEventArgs) {
    this.leftColumn = $event.newLeftCol;
    console.log('Left Column: ' + this.leftColumn);
    this.rightColumn = $event.sheet.getViewportRightColumn(1);
    console.log('Right Column: ' + this.rightColumn);
  }

  onWorkbookInit($event: any) {
    const self = this;
    self.spread = $event.spread;
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      self.getColumnsWidth(self.spread.getActiveSheet());
    });
  }

  onActiveSheetChanged($event: IActiveSheetChangedEventArgs) {
    this.columnWidths = [];
    this.getColumnsWidth($event.newSheet);
  }

  onColumnChanged($event: IColumnChangedEventArgs, $event2: any) {
    if ($event.propertyName === 'addColumns') {
      this.getColumnsWidth($event2.sheet);
    } else {
      this.columnWidths.splice($event.col, 1);
    }
  }

  // Set the actual columnWidths of the columns in an array
  getColumnsWidth(sheet: GC.Spread.Sheets.Worksheet) {
    this.rows = sheet.getColumnCount();
    for (let i = 0; i < this.rows; i++) {
      const width = sheet.getColumnWidth(i) - 10;
      this.columnWidths[i] = width + 'px';
      // console.log(this.columnWidths[i]);
    }
  }

}

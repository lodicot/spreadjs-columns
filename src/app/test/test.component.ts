import { Component, OnInit } from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import {DataService} from '../app-data.service';
import * as Excel from '@grapecity/spread-excelio';

// tslint:disable-next-line:class-name
interface dataDef {
  name: string;
  Age: number;
  Birthday: string;
  Position: string;
  happy: boolean;
  pet: string;
  salary: number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {
  rowHeaderVisible = true;
  columnHeaderVisible = true;
  autoGenerateColumns = false;
  resizable = true;
  visible = true;
  sheetName = 'TestSheet';
  formatter = '$ #.00';
  width = 100;
  nameStyle = new GC.Spread.Sheets.Style();
  ageStyle = new GC.Spread.Sheets.Style();
  newTabVisible = true;
  tabStripVisible = true;
  spreadBackColor = '#FFFFFF';
  grayAreaBackColor = '#E4E4E4';
  selectionBackColor = '#D0D0D0';
  selectionBorderColor = '#217346';

  private spread: GC.Spread.Sheets.Workbook;
  private excelIO;


  checkBoxCellType = new GC.Spread.Sheets.CellTypes.CheckBox();
  hostStyle = {
    top: '80px',
    bottom: '900px'
  };


  data: Array<dataDef> = [
    { name: 'Alice', Age: 27, Birthday: '1985/08/31', Position: 'PM', happy: true, pet: 'dog', salary: 2345.67 },
    { name: 'Aimee', Age: 28, Birthday: '1984/07/31', Position: 'TL', happy: false, pet: 'turtle', salary: 4000 },
    { name: '', Age: 29, Birthday: '1983/03/31', Position: 'QC', happy: false, pet: '', salary: 3456.2 },
    { name: 'Fred', Age: 30, Birthday: '1982/02/20', Position: 'DL', happy: true, pet: '', salary: null },
    { name: 'Angelia', Age: 31, Birthday: '1981/05/30', Position: 'QC', happy: true, pet: 'guinea pig', salary: 9320.05 },
    { name: 'Peter', Age: 32, Birthday: '1980/11/08', Position: 'QC', happy: false, pet: '', salary: 3452.009 }
  ];

  constructor(private dataservice: DataService) {
    this.nameStyle.watermark = 'Username';
    this.ageStyle.font = '8pt Arial';
    // this.ageStyle.vAlign = 'center';
    this.ageStyle.foreColor = 'yellow';
    this.excelIO = new Excel.IO();
  }

  ngOnInit() {
  }

  workbookInit(args) {
    const self = this;
    self.spread = args.spread;
    const sheet = self.spread.getActiveSheet();
    sheet.getCell(0, 0).foreColor('blue');
    sheet.getCell(1, 0).foreColor('blue');
    sheet.getCell(2, 0).foreColor('blue');
    sheet.getCell(3, 0).foreColor('red');
    sheet.getCell(0, 1).foreColor('blue');
    sheet.getCell(1, 1).foreColor('blue');
    sheet.getCell(2, 1).foreColor('blue');
    sheet.getCell(3, 1).foreColor('blue');
    sheet.getCell(0, 2).foreColor('blue');
    sheet.getCell(1, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 2).foreColor('blue');
    sheet.getCell(3, 2).foreColor('blue');
    sheet.getCell(0, 3).foreColor('blue');
    sheet.getCell(1, 3).foreColor('green');
    sheet.getCell(2, 3).foreColor('blue');
    sheet.getCell(3, 3).foreColor('blue');
    sheet.getCell(0, 5).foreColor('#B61859').hAlign(GC.Spread.Sheets.HorizontalAlign.right);
    sheet.getCell(1, 5).foreColor('#18B61C').hAlign(GC.Spread.Sheets.HorizontalAlign.center);
  }

}

import {Component, OnInit} from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import IColumnWidthChangedEventArgs = GC.Spread.Sheets.IColumnWidthChangedEventArgs;
import ILeftColumnChangedEventArgs = GC.Spread.Sheets.ILeftColumnChangedEventArgs;
import IActiveSheetChangedEventArgs = GC.Spread.Sheets.IActiveSheetChangedEventArgs;
import IColumnChangedEventArgs = GC.Spread.Sheets.IColumnChangedEventArgs;
import {DataService} from '../app-data.service';
import {EventsService} from '../service/events.service';
import SheetArea = GC.Spread.Sheets.SheetArea;

export namespace GSpread {
  export interface ColumnProperty {
    width: number;
    visible: boolean;
    backgroundColor: string;
    no: number;
    text: string;
  }

  export interface ResizingStartEvent {
    no: number;
  }
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})

export class SelectorComponent implements OnInit {
  // the reference to the spread workbook
  private spread: GC.Spread.Sheets.Workbook;
  // the defaults for the spread workbook
  private sheetName = 'Adress Book';
  private hostStyle = {
    top: '140px',
    bottom: '150px'
  };
  // current leftColumn of the spread sheet
  private leftColumn = 0;
  // generate columns based on the data content
  private autoGenerateColumns = false;
  private data: any;
  // variables for the columns
  private columnProps: Array<GSpread.ColumnProperty> = [];
  private colors: Array<string> = ['green', 'chartreuse', 'LightCyan', 'gold', 'PaleGreen', 'cyan', 'magenta', 'yellow'];
  // variables for the resizing logic
  private isResizing = false;
  private mouseX = 0;
  private startResizingX = 0;
  private startResizingWidth = 0;
  private resizingWidgetNo = 0;

  // My settings ************************************************************************************
  rowHeaderVisible = false;
  private selections: number [][] = [];
  private activeSheetIndex = null;
  private numberOfSheets = null;

  // tslint:disable-next-line:variable-name
  constructor(private dataservice: DataService) {
    this.data = dataservice.getPersonAddressData();
  }

  ngOnInit() {
    console.log(this.selections);
  }

  /**
   * spreadjs throws the event after the column with has changed
   * @param $event
   */
  onColumnWidthChanged($event: IColumnWidthChangedEventArgs) {
    this.getColumnsWidth($event.sheet);
  }

  /**
   * spreadjs throws the event after the column with has changed
   * @param $event
   */
  onLeftColumnChanged($event: ILeftColumnChangedEventArgs) {
    this.leftColumn = $event.newLeftCol;
    this.getColumnsWidth($event.sheet);
  }

  /**
   * spreadjs throws the event at initialize - contains the reference to the workbook
   * @param $event
   */
  onWorkbookInit($event: any) {
    const self = this;
    self.spread = $event.spread;
    const columns = self.spread.getActiveSheet().getColumnCount();
    self.numberOfSheets = self.spread.getSheetCount();
    self.activeSheetIndex = self.spread.getActiveSheetIndex();
    self.selections.push(new Array());
    for (let i = 0; i < columns; i++) {
      self.selections[self.activeSheetIndex].push(0);
    }
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      self.getColumnsWidth(self.spread.getActiveSheet());
    });
  }

  /**
   * spreadjs throws the event at changing the sheet
   * @param $event
   */
  onActiveSheetChanged($event: IActiveSheetChangedEventArgs) {
    const self = this;
    self.activeSheetIndex = self.spread.getActiveSheetIndex();
    const newNumberOfSheets = self.spread.getSheetCount();
    /** Sheet added **/
    if (newNumberOfSheets > (self.numberOfSheets)) {
      console.log('sheet added');
      self.selections.push(new Array);
      const columns = self.spread.getActiveSheet().getColumnCount();
      for (let i = 0; i < columns; i++) {
        self.selections[self.activeSheetIndex].push(0);
      }
    }
    /** Sheet deleted **/
    else if (self.spread.getSheetCount() < self.numberOfSheets) {
      console.log('sheet deleted');
      self.selections.splice(self.activeSheetIndex, 1);
    }
    self.numberOfSheets = newNumberOfSheets;
    this.getColumnsWidth($event.newSheet);
    console.log(this.selections);
  }

  /**
   * spreadjs throws the event at changing of column width or at insert or delete of columns
   * @param $event
   */
  onColumnChanged($event: IColumnChangedEventArgs) {
    // console.log("column changed " + this.isResizing);
    if (this.isResizing === false) {
      console.log('column changed');
      this.getColumnsWidth($event.sheet);
      if ($event.propertyName === 'addColumns') {
        this.selections[this.activeSheetIndex].splice($event.col, 0, 0);
      } else {
        this.selections[this.activeSheetIndex].splice($event.col, 1);
      }
    }
  }

  /**
   * reveice  mouse events for the para bar - includes the events for the child elements
   * @param $event
   */
  onMouseMove($event: MouseEvent) {
    this.mouseX = $event.x;
    if (this.isResizing) {
      const width = this.startResizingWidth + ($event.x - this.startResizingX);
      this.columnProps[this.resizingWidgetNo].width = width < 0 ? 0 : width;
      const self = this;
      self.spread.getActiveSheet().setColumnWidth(this.resizingWidgetNo, width);
    }
  }

  /**
   * receive mouse up events for the parabar
   * @param $event
   */
  onMouseUp($event: MouseEvent) {
    this.isResizing = false;
  }

  /**
   * receive mouse up events for the parabar
   * @param $event
   */
  onMouseEnter($event: MouseEvent) {
    if ($event.buttons === 0) {
      if (this.isResizing === true) {
        this.isResizing = false;
      }
    }
  }

  onResizingStart($event: GSpread.ResizingStartEvent) {
    this.isResizing = true;
    this.startResizingX  = this.mouseX;
    this.resizingWidgetNo = $event.no;
    this.startResizingWidth = this.columnProps[this.resizingWidgetNo].width;
  }

  private getColor(i: number): string {
    return this.colors[i % this.colors.length];
  }

  getColumnsWidth(sheet: GC.Spread.Sheets.Worksheet) {
    this.columnProps = [];
    for (let i = 0; i < sheet.getColumnCount(); i++) {
      (i >= this.leftColumn) ?
        this.columnProps.push({
          width: sheet.getColumnWidth(i),
          visible: true,
          backgroundColor: this.getColor(i),
          no: i,
          text: sheet.getValue(0, i, SheetArea.colHeader)
        }) :
        this.columnProps.push({
          width: 0,
          visible: false,
          backgroundColor: this.getColor(i),
          no: i,
          text: sheet.getValue(0, i, SheetArea.colHeader)
        });
    }
  }

  onSelectionChanged(serverData: {selectedValue: number, selectedName: string}, index) {
    this.selections[this.activeSheetIndex].splice(index, 1, serverData.selectedValue);
    console.log(this.selections);
  }

}

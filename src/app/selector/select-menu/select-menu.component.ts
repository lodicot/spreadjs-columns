import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GSpread} from '../selector.component';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})
export class SelectMenuComponent implements OnInit {
  // @Input() width: string;                                                   // my
  @Input() columnProperty?: GSpread.ColumnProperty;
  @Output() resizingStart = new EventEmitter<GSpread.ResizingStartEvent>();
  @Output() selectionChanged = new EventEmitter<{selectedValue: number, selectedName: string}>();

  values = [
    {id: null, name: 'Select ...'},
    {id: 1, name: 'Name'},
    {id: 2, name: 'Country Region Code'},
    {id: 3, name: 'City'},
    {id: 4, name: 'Address Line'},
    {id: 5, name: 'Postal Code'}
  ];

  constructor() { }

  ngOnInit() {
  }

  getWidth() {
    const dragWidth = 6;
    return this.columnProperty.width - dragWidth < 0 ? 0 : this.columnProperty.width - dragWidth;
  }

  private onMouseDown($event: MouseEvent) {
    this.resizingStart.emit({no : this.columnProperty.no});
  }

  onChange($event) {
    this.selectionChanged.emit({
      selectedValue: $event.target.selectedIndex,
      selectedName: $event.target.value
    });
  }
}

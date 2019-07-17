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
}

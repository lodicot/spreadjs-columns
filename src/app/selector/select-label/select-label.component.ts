import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-label',
  templateUrl: './select-label.component.html',
  styleUrls: ['./select-label.component.css']
})
export class SelectLabelComponent implements OnInit {
  @Input() width: string;

  constructor() { }

  ngOnInit() {
  }

}

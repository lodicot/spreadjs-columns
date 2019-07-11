import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})
export class SelectMenuComponent implements OnInit {
  @Input() width: string;

  constructor() { }

  ngOnInit() {
  }

}

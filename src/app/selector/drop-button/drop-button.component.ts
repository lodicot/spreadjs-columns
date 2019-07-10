import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-button',
  templateUrl: './drop-button.component.html',
  styleUrls: ['./drop-button.component.css']
})

export class DropButtonComponent implements OnInit {
  @Input() width: string;
  constructor() { }

  ngOnInit() {
  }

}

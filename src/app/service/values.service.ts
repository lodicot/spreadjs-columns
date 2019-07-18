import { Injectable, EventEmitter } from '@angular/core';

export interface Value {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  public  valuesChanged: EventEmitter<Value[]> = new EventEmitter<Value[]>();

  constructor() { }

  public setValues(values: Value[]) {
    this.valuesChanged.emit(values);
  }

  public getValues(): EventEmitter<Value[]> {
    return this.valuesChanged;
  }
}

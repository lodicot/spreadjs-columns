
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export enum Events {
  MOUSE_MOVE_EVENT,
  MOUSE_UP_EVENT
}

/**
 * defines data to be transmitted by events (name of interfaces are the same as event names above)
 */
export namespace EventData {

  export type EventType = EventData.MouseMoveEvent |
    EventData.MouseUpEvent;

  export interface MouseMoveEvent{
    event: MouseEvent;
  }
  export interface MouseUpEvent {
    event: MouseEvent;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private emitters = new Map();

  constructor() {
  }

  private getEmitter(eventName: Events): EventEmitter<EventData.EventType> {
    if (!this.emitters.has(eventName)) {
      this.emitters.set(eventName, new EventEmitter(false));
    }
    return this.emitters.get(eventName);
  }

  subscribe(eventName: Events): Observable<EventData.EventType> {
    return this.getEmitter(eventName).asObservable();
  }

  notify(eventName: Events, data?: EventData.EventType): void {
    // console.log(`sending event: ${Events[eventName]}`, data);
    this.getEmitter(eventName).emit(data);
  }

}

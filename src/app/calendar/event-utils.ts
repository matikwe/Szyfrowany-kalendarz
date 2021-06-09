import { EventInput } from '@fullcalendar/angular';
import { GetalleventsService } from '../getallevents.service';
import { HttpClient } from '@angular/common/http';
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// const events = new GetalleventsService( http: HttpClient);

export const INITIAL_EVENTS: EventInput[] = [];

export function createEventId() {
  return String(eventGuid++);
}

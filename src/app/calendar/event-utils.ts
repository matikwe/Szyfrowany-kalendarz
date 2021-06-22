import { EventInput } from '@fullcalendar/angular';
import { GetalleventsService } from '../getallevents.service';
import { HttpClient } from '@angular/common/http';
let eventGuid = 1;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

// const getInitialEvents = () => {
//   const getAllEvents = new GetalleventsService();
// };

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Wydarzenie zaplanowane na całą dobę',
    start: TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Wydarzenie czasowe',
    start: TODAY_STR + 'T12:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

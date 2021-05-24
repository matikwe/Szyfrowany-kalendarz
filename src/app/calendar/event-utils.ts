import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

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

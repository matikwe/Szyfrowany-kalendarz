import { Component } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  constructor(private Event: EventsService, private router: Router) {}

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const Id = createEventId();
      const _start = selectInfo.startStr;
      const _end = selectInfo.endStr;
      const _allDay = selectInfo.allDay;

      // const event = {
      //   id: Id,
      //   title,
      //  start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: _allDay,
      // }
      calendarApi.addEvent({
        id: Id,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: _allDay,
      });
      this.Event.postEvent(title, _start, _end, _allDay).subscribe((data) => {
        if (data.success) {
        } else {
          window.alert(data.message);
        }
      });
      // console.log({
      //   id: Id,
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay,
      // });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      console.log(clickInfo.event.title);
      console.log(clickInfo.event.id);
      console.log(clickInfo.event.start);
      console.log(clickInfo.event.end);
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  showEventsConsole() {
    console.log(this.currentEvents);
  }
}

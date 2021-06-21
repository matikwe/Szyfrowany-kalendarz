import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventsService } from '../events.service';
import { EventsdeleteService } from '../eventsdelete.service';
import { GetalleventsService } from '../getallevents.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Identifiers } from '@angular/compiler';
let allEvents = INITIAL_EVENTS;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
    },
    initialView: 'dayGridMonth',
    initialEvents: allEvents, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  constructor(
    private Event: EventsService,
    private deleteEvent: EventsdeleteService,
    private getALLEvents: GetalleventsService,
    private router: Router
  ) {}

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


      
      const event = {
        id: Id,
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      calendarApi.addEvent(event);

      this.Event.postEvent(event).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          window.alert(err);
        }
      );

      // this.getALLEvents.getALLEvents().subscribe(
      //   (res) => {
      //     console.log(res);
      //   },
      //   (err) => {
      //     window.alert(err);
      //   }
      // );
    }
  }

  ngOnInit() {
    this.getALLEvents.getALLEvents().subscribe(
      (res) => {
        console.log(res);
        allEvents = res;
        allEvents.forEach((el) => {
          Object.assign({}, el);
        });
        console.log(allEvents);
      },
      (err) => {
        window.alert(err);
      }
    );
  }
  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const event = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,

        start: clickInfo.event.start,
        end: clickInfo.event.end,
        allDay: clickInfo.event.allDay,
      };
      console.log(clickInfo.event.id);
      this.deleteEvent.deleteEvent(event).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          window.alert(err);
        }
      );

      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventsService } from '../events.service';
import { EventsdeleteService } from '../eventsdelete.service';
import { GetalleventsService } from '../getallevents.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  initialEvents = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
    },
    initialView: 'dayGridMonth',
    events: [], // alternatively, use the `events` setting to fetch from a feed
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

    calendarApi.unselect();

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

      this.Event.postEvent(event).subscribe(
        (res) => {
          const resId: string = res;
          const eventApi = {
            id: resId,
            title: title,
            start: _start,
            end: _end,
            allDay: _allDay,
          };

          calendarApi.addEvent(eventApi);
        },
        (err) => {
          window.alert(err);
        }
      );
    }
  }

  ngOnInit() {
    this.getALLEvents.getALLEvents().subscribe(
      (res) => {
        res.forEach((element) => {
          const event = {
            id: element[0],
            title: element[1],
            start: element[2],
            end: element[3],
            allDay: element[4],
            userId: element[5],
          };
          this.initialEvents.push(event);
        });
        console.log(this.initialEvents);

        this.calendarOptions.events = this.initialEvents;
        console.log(this.calendarOptions.events);
      },
      (err) => {
        window.alert('Brak wydarzeń');
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
    let allEvents = [];
    this.getALLEvents.getALLEvents().subscribe(
      (res) => {
        res.forEach((element) => {
          const event = {
            id: element[0],
            title: element[1],
            start: element[2],
            end: element[3],
            allDay: element[4],
            userId: element[5],
          };
          allEvents.push(event);
        });
      },
      (err) => {}
    );
    // this.initialEvents = allEvents as EventInput[];
    this.currentEvents = allEvents as EventApi[];
  }
}

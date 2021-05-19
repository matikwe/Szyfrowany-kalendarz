import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let akcja: any;
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  addEventForm: FormGroup;
  submitted = false;
  //Add user form actions
  get f() {
    return this.addEventForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.addEventForm.get('title').setValidators([Validators.required]);
    this.addEventForm.get('title').updateValueAndValidity();
    if (this.addEventForm.invalid) {
      return;
    }
  }
  constructor(private formBuilder: FormBuilder) {}
  title = 'angularadmintemplates';
  calendarOptions: CalendarOptions;
  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: [
        { title: 'event 1', date: '2020-11-05' },
        { title: 'event 2', date: '2020-06-30' },
      ],
    };
    //Add User form validations
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }
  //Show Modal with Forn on dayClick Event
  handleDateClick(arg) {
    akcja('#myModal').modal('show');
    akcja('.modal-title, .eventstarttitle').text('');
    akcja('.modal-title').text('Add Event at : ' + arg.dateStr);
    akcja('.eventstarttitle').text(arg.dateStr);
  }
  //Hide Modal PopUp and clear the form validations
  hideForm() {
    this.addEventForm.patchValue({ title: '' });
    this.addEventForm.get('title').clearValidators();
    this.addEventForm.get('title').updateValueAndValidity();
  }
}

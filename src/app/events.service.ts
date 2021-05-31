import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  postEvent(title, start, end, allDay) {
    console.log(title, start, end, allDay);
    return this.http.post<myData>(
      './api/events.php',
      {
        title,
        start,
        end,
        allDay,
      }
      // { responseType: 'text' }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Form } from '@angular/forms';
// import { Observable } from 'rxjs';

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  postEvent(event) {
    return this.http.post<any>('./api/events.php', event);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class EventsdeleteService {
  constructor(private http: HttpClient) {}
  deleteEvent(event) {
    return this.http.post<myData>('./api/delete_event.php', event);
  }
}

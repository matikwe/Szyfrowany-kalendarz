import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface myData {
  success: boolean;
  message: string;
}

class Event {
  constructor(
    id: number,
    title: string,
    start: Date,
    end: Date,
    allDay: boolean,
    iduser: number
  ) {}
}
@Injectable({
  providedIn: 'root',
})
export class GetalleventsService {
  constructor(private http: HttpClient) {}
  getALLEvents() {
    return this.http.get<any>('./api/all_events.php');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CalendarEvent {
  startDate: string;
  endDate: string;
  title: string;
  location: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>('/assets/events.json');
  }

  getUpcomingEvents(count: number): Observable<CalendarEvent[]> {
    const now = new Date();
    
    return this.http.get<CalendarEvent[]>('/assets/events.json').pipe(
      map(events => events
        .filter(event => new Date(event.startDate) >= now)
        .sort((a: CalendarEvent, b: CalendarEvent) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, count)
      )
    );
  }
}

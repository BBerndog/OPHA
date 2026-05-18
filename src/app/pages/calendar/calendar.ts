import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { NzCalendarComponent } from 'ng-zorro-antd/calendar';
import { DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import { EventService, CalendarEvent } from '../../services/event.service';

@Component({
  standalone: true,
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCalendarComponent, DatePipe],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class Calendar {
  private eventService = inject(EventService);
  events = signal<CalendarEvent[]>([]);

  constructor() {
    effect(() => {
      this.eventService.getAllEvents().subscribe(events => {
        this.events.set(events);
      });
    });
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events().filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const day = new Date(date.toISOString().split('T')[0]);
      const startDay = new Date(start.toISOString().split('T')[0]);
      const endDay = new Date(end.toISOString().split('T')[0]);

      return day >= startDay && day <= endDay;
    })
  }
}

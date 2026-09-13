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
    const day = this.getDateKey(date);

    return this.events().filter(event => {
      const startDay = event.startDate.slice(0, 10);
      const endDay = event.endDate.slice(0, 10);

      return day >= startDay && day <= endDay;
    });
  }

  private getDateKey(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }
}

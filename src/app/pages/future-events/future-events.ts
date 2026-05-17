import { Component, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import { EventService, CalendarEvent } from '../../services/event.service';

@Component({
  standalone: true,
  selector: 'app-future-events',
  imports: [CommonModule, RouterModule],
  templateUrl: './future-events.html',
  styleUrl: './future-events.scss',
})
export class FutureEvents {
  private eventService = inject(EventService);
  @Input() count = 5;
  events = signal<CalendarEvent[]>([]);

  constructor() {
    effect(() => {
      this.eventService.getUpcomingEvents(this.count).subscribe(events => {
        this.events.set(events);
      });
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTimeRange(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const isAllDay = 
      startDate.getHours() === 0 && startDate.getMinutes() === 0 &&
      endDate.getHours() === 0 && endDate.getMinutes() === 0;
    
    if (isAllDay) {
      return 'All Day';
    }

    return (
      new Date(start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) +
      ' - ' +
      new Date(end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    );
  }
}

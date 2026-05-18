import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface NewsEvent {
  date: string;
  headline: string;
	description: string;
  link: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient) {}

  getAllNews(): Observable<NewsEvent[]> {
    return this.http.get<NewsEvent[]>('/assets/news.json');
  }

  getRecentNews(count: number): Observable<NewsEvent[]> {
    const now = new Date();
    
    return this.http.get<NewsEvent[]>('/assets/news.json').pipe(
      map(events => events
        .filter(event => new Date(event.date) >= new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000))
        .sort((a: NewsEvent, b: NewsEvent) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count)
      )
    );
  }
}

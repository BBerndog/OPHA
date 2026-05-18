import { Component, inject, effect, Input, signal } from '@angular/core';
import { NewsEvent, NewsService } from '../../../services/news.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-headlines',
  imports: [RouterModule, CommonModule],
  templateUrl: './headlines.html',
  styleUrl: './headlines.scss',
})
export class Headlines {
  private NewsService = inject(NewsService);
  @Input() count = 6;
  headlines = signal<NewsEvent[]>([]);

  constructor() {
    effect(() => {
      this.NewsService.getRecentNews(this.count).subscribe(news => {
        this.headlines.set(news);
      });
    });
  }
}

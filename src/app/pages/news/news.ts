import { Component, inject, signal, effect, Input } from '@angular/core';
import { NewsService, NewsEvent } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  private newsService = inject(NewsService);
  @Input() count = 6;
  news = signal<NewsEvent[]>([]);

  constructor() {
    effect(() => {
      this.newsService.getRecentNews(this.count).subscribe(news => {
        this.news.set(news);
      });
    });
  }
}

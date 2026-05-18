import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

interface InfoTab {
  name: string;
  icon: string;
  contentUrl: string;
}

@Component({
  standalone: true,
  selector: 'app-info',
  imports: [CommonModule, NzIconModule, NzTabsModule],
  templateUrl: './info.html',
  styleUrls: ['./info.scss'],
})
export class Info {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  tabs: InfoTab[] = [
    {
      name: 'Mailbox Replacement',
      icon: 'mail',
      contentUrl: 'assets/info/mailbox-replacement.html'
    },
    {
      name: 'Trash Schedule',
      icon: 'schedule',
      contentUrl: 'assets/info/trash-schedule.html'
    },
    {
      name: 'Plainfield Ordinances',
      icon: 'file-text',
      contentUrl: 'assets/info/plainfield-ordinances.html'
    }
  ];

  selectedIndex = 0;
  selectedContent: SafeHtml | null = null;

  constructor() {
    this.loadSelectedTabContent();
  }

  onTabIndexChange(index: number): void {
    this.selectedIndex = index;
    this.loadSelectedTabContent();
  }

  private loadSelectedTabContent(): void {
    const contentUrl = this.tabs[this.selectedIndex]?.contentUrl;
    if (!contentUrl) {
      this.selectedContent = null;
      return;
    }

    this.http.get(contentUrl, { responseType: 'text' }).subscribe(html => {
      this.selectedContent = this.sanitizer.bypassSecurityTrustHtml(html);
    });
  }
}

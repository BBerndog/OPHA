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
  contentType?: 'html' | 'json';
}

interface MailboxItem {
  product: string;
  description: string;
  standardPricing: {
    pickUp: number | string;
    install: number | string;
  };
  exclusiveProviderPricing: {
    pickUp: number | string;
    install: number | string;
  };
  savings: {
    pickUp: number | string;
    install: number | string;
  };
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
      contentUrl: 'assets/mailbox.json',
      contentType: 'json'
    },
    {
      name: 'Trash Schedule',
      icon: 'schedule',
      contentUrl: 'assets/info/trash-schedule.html',
      contentType: 'html'
    },
    {
      name: 'Plainfield Ordinances',
      icon: 'file-text',
      contentUrl: 'assets/info/plainfield-ordinances.html',
      contentType: 'html'
    }
  ];

  selectedIndex = 0;
  selectedContent: SafeHtml | null = null;
  mailboxItems: MailboxItem[] = [];

  constructor() {
    this.loadSelectedTabContent();
  }

  onTabIndexChange(index: number): void {
    this.selectedIndex = index;
    this.loadSelectedTabContent();
  }

  get selectedTab(): InfoTab | undefined {
    return this.tabs[this.selectedIndex];
  }

  trackByProduct(index: number, item: MailboxItem): string {
    return item.product;
  }

  private loadSelectedTabContent(): void {
    const currentTab = this.selectedTab;
    if (!currentTab) {
      this.selectedContent = null;
      this.mailboxItems = [];
      return;
    }

    if (currentTab.contentType === 'json') {
      this.http.get<MailboxItem[]>(currentTab.contentUrl).subscribe(items => {
        this.mailboxItems = items;
        this.selectedContent = null;
      });
      return;
    }

    this.http.get(currentTab.contentUrl, { responseType: 'text' }).subscribe(html => {
      this.selectedContent = this.sanitizer.bypassSecurityTrustHtml(html);
      this.mailboxItems = [];
    });
  }
}

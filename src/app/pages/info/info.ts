import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

interface InfoTab {
  name: string;
  icon: string;
  contentType: 'json' | 'static';
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

  tabs: InfoTab[] = [
    {
      name: 'Mailbox Replacement',
      icon: 'mail',
      contentType: 'json'
    },
    {
      name: 'Trash Schedule',
      icon: 'schedule',
      contentType: 'static'
    },
    {
      name: 'Plainfield Ordinances',
      icon: 'file-text',
      contentType: 'static'
    }
  ];

  selectedIndex = 0;
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
      this.mailboxItems = [];
      return;
    }

    if (currentTab.contentType !== 'json') {
      return;
    }

    this.http.get<MailboxItem[]>('assets/mailbox.json').subscribe(items => {
      this.mailboxItems = items;
    });
  }
}

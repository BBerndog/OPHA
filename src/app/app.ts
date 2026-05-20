import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
		NzLayoutModule,
		NzMenuModule,
		NzIconModule
	],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private router = inject(Router);

  constructor() {
        this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NAV START →', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('NAV END   →', event.url);
      } else if (event instanceof NavigationCancel) {
        console.warn('NAV CANCEL →', event.url, 'reason:', event.reason);
      } else if (event instanceof NavigationError) {
        console.error('NAV ERROR  →', event.url, 'error:', event.error);
      }
    });
  }
}

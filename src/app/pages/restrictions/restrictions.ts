import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule, NzTabPosition } from 'ng-zorro-antd/tabs';
import { Covenant, CovenantService } from '../../services/covenant.service';

@Component({
  standalone: true,
  selector: 'app-restrictions',
  imports: [CommonModule, FormsModule, NzInputNumberModule, NzRadioModule, NzTabsModule],
  templateUrl: './restrictions.html',
  styleUrls: ['./restrictions.scss'],
})
export class Restrictions implements OnInit {
  private covenantService = inject(CovenantService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);

  covenants = signal<Covenant[]>([]);
  tabs: Array<{ name: string; disabled: boolean }> = [];
  nzTabPosition: NzTabPosition = 'left';
  selectedIndex = 0;
  selectedContent = signal<SafeHtml | null>(null);

  ngOnInit(): void {
    this.covenantService.getCovenants().subscribe({
      next: covenants => {
        this.covenants.set(covenants ?? []);
        this.populateTabs();
        this.loadSelectedTabContent();
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Error loading covenants', err);
        this.covenants.set([]);
        this.tabs = [];
        this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(
          '<p>Unable to load covenant data at this time.</p>'
        ));
      }
    });
  }

  private populateTabs(): void {
    const list = this.covenants();
    this.tabs = list.map(c => ({
      name: `${c.id} - ${c.covenant}`,
      disabled: false
    }));
    if (this.selectedIndex >= this.tabs.length) {
      this.selectedIndex = 0;
    }
  }

  onTabIndexChange(index: number): void {
    this.selectedIndex = index;
    this.loadSelectedTabContent();
  }

  private loadSelectedTabContent(): void {
    const list = this.covenants();
    if (!list.length || this.selectedIndex < 0 || this.selectedIndex >= list.length) {
      this.selectedContent.set(null);
      return;
    }

    const covenant = list[this.selectedIndex];

    if (covenant.descriptionUrl) {
      this.http.get(covenant.descriptionUrl, { responseType: 'text' }).subscribe({
        next: html => {
          this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(html));
        },
        error: err => {
          console.error('Error loading covenant HTML', err);
          this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(
            `<p>Unable to load details for "${covenant.covenant}".</p>`
          ));
        }
      });
    } else {
      const desc = covenant.description || '';
      this.selectedContent.set(
        this.sanitizer.bypassSecurityTrustHtml(`<p>${desc}</p>`)
      );
    }
  }

  log(args: unknown[]): void {
    console.log(args);
  }
}

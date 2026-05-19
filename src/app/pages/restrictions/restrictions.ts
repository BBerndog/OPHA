import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';
import { Covenant, CovenantService } from '../../services/covenant.service';

@Component({
  standalone: true,
  selector: 'app-restrictions',
  imports: [CommonModule, FormsModule, NzInputNumberModule, NzRadioModule, NzTabsModule],
  templateUrl: './restrictions.html',
  styleUrl: './restrictions.scss',
})
export class Restrictions {
  private covenantService = inject(CovenantService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  
  covenants = signal<Covenant[]>([]);
  tabs: Array<{ name: string; disabled: boolean }> = [];
  nzTabPosition: NzTabPosition = 'left';
  selectedIndex = 0;
  selectedContent = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      this.covenantService.getCovenants().subscribe(covenants => {
        this.covenants.set(covenants);
        this.populateTabs();
        // Load content after covenants are populated
        setTimeout(() => this.loadSelectedTabContent(), 0);
      });
    });
  }

  private populateTabs(): void {
    this.tabs = this.covenants().map(covenant => ({
      name: covenant.id.toString() + ' - ' + covenant.covenant,
      disabled: false
    }));
  }

  onTabIndexChange(index: number): void {
    this.selectedIndex = index;
    this.loadSelectedTabContent();
  }

  private loadSelectedTabContent(): void {
    const covenant = this.covenants()[this.selectedIndex];
    if (!covenant) return;

    if (covenant.descriptionUrl) {
      // Load external HTML file
      this.http.get(covenant.descriptionUrl, { responseType: 'text' }).subscribe(html => {
        this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(html));
      });
    } else {
      // Use inline description
      this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(`<p>${covenant.description}</p>`));
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {
    console.log(args);
  }
}

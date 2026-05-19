import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Covenant, CovenantService } from '../../../services/covenant.service';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-covenants',
  imports: [CommonModule, NzDropdownModule, NzIconModule, RouterModule, NzSelectModule, FormsModule],
  templateUrl: './covenants.html',
  styleUrls: ['./covenants.scss'],
})
export class Covenants {
  private covenantService = inject(CovenantService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  
  covenants = signal<Covenant[]>([]);
  selectedCovenant = signal<Covenant | null>(null);
  selectedContent = signal<SafeHtml | null>(null);
  sections = signal<{ id: string, html: string }[]>([]);
  selectedSectionIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      this.covenantService.getCovenants().subscribe(covenants => {
        this.covenants.set(covenants);
        // choose a random default covenant when the list loads
        if (covenants && covenants.length > 0) {
          const idx = Math.floor(Math.random() * covenants.length);
          const selected = covenants[idx];
          this.selectedCovenant.set(selected);
          this.loadContentForCovenant(selected);
        }
      });
    });
  }

  selectCovenant(covenant: Covenant): void {
    this.selectedCovenant.set(covenant);
    this.loadContentForCovenant(covenant);

    this.sections.set([]);
    this.selectedSectionIndex.set(null);
  }

  private loadContentForCovenant(covenant: Covenant): void {
    if (covenant.descriptionUrl) {
      // Load external HTML file
      this.http.get(covenant.descriptionUrl, { responseType: 'text' }).subscribe(html => {
        this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(html));

        // Split into subsections if multiple <div> blocks exist
        const parts = html.split('</div>').filter(x => x.trim().length > 0);

        if (parts.length > 1) {
          const formatted = parts.map((block, i) => ({
            id: String.fromCharCode(97 + i),
            html: block + '</div>'
          }))
          this.sections.set(formatted);
          this.selectedSectionIndex.set(0); // default to first section
        }
      });
    } else {
      // Use inline description
      this.selectedContent.set(this.sanitizer.bypassSecurityTrustHtml(`<p>${covenant.description}</p>`));
    }
  }
}

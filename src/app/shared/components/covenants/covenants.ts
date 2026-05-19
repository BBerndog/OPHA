import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [
    CommonModule,
    NzDropdownModule,
    NzIconModule,
    RouterModule,
    NzSelectModule,
    FormsModule
  ],
  templateUrl: './covenants.html',
  styleUrls: ['./covenants.scss'],
})
export class Covenants {
  private covenantService = inject(CovenantService);
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

        if (covenants && covenants.length > 0) {
          const idx = Math.floor(Math.random() * covenants.length);
          const selected = covenants[idx];
          this.selectCovenant(selected);
        }
      });
    });
  }

  selectCovenant(covenant: Covenant): void {
    this.selectedCovenant.set(covenant);

    // Reset section state
    this.sections.set([]);
    this.selectedSectionIndex.set(null);

    if (covenant.descriptionUrl) {
      this.covenantService.loadCovenantHtml(covenant.descriptionUrl)
        .subscribe(result => {
          // Set full HTML
          this.selectedContent.set(
            this.sanitizer.bypassSecurityTrustHtml(result.html)
          );

          // Set sections if any
          if (result.sections.length > 1) {
            this.sections.set(result.sections);
            this.selectedSectionIndex.set(0);

            // Load Section A content
            const first = result.sections[0].html;
            this.selectedContent.set(
              this.sanitizer.bypassSecurityTrustHtml(first)
            );
          }
        });
    } else {
      // Inline description fallback
      this.selectedContent.set(
        this.sanitizer.bypassSecurityTrustHtml(`<p>${covenant.description}</p>`)
      );
    }
  }

  selectSection(i: number) {
    this.selectedSectionIndex.set(i);
    const html = this.sections()[i].html;
    this.selectedContent.set(
      this.sanitizer.bypassSecurityTrustHtml(html)
    );
  }
}

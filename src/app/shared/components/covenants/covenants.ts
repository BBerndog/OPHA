import { Component, inject, signal, effect } from '@angular/core';
import { Covenant, CovenantService } from '../../../services/covenant.service';
import { CommonModule } from '@angular/common';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-covenants',
  imports: [CommonModule, NzDropdownModule, NzIconModule, RouterModule],
  templateUrl: './covenants.html',
  styleUrls: ['./covenants.scss'],
})
export class Covenants {
  private covenantService = inject(CovenantService);
  covenants = signal<Covenant[]>([]);
  selectedCovenant = signal<Covenant | null>(null);

  constructor() {
    effect(() => {
      this.covenantService.getCovenants().subscribe(covenants => {
        this.covenants.set(covenants);
        // choose a random default covenant when the list loads
        if (covenants && covenants.length > 0) {
          const idx = Math.floor(Math.random() * covenants.length);
          this.selectedCovenant.set(covenants[idx]);
        }
      });
    });
  }

  selectCovenant(covenant: Covenant): void {
    this.selectedCovenant.set(covenant);
  }
}

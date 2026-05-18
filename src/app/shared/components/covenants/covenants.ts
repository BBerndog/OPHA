import { Component, inject, signal, effect } from '@angular/core';
import { Covenant, CovenantService } from '../../../services/covenant.service';
import { CommonModule } from '@angular/common';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  selector: 'app-covenants',
  imports: [CommonModule, NzDropdownModule, NzIconModule],
  templateUrl: './covenants.html',
  styleUrl: './covenants.scss',
})
export class Covenants {
  private covenantService = inject(CovenantService);
  covenants = signal<Covenant[]>([]);

  constructor() {
    effect(() => {
      this.covenantService.getCovenants().subscribe(covenants => {
        this.covenants.set(covenants);
      });
    });
  }
}

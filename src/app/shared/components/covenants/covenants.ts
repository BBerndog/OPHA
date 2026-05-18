import { Component, inject, signal } from '@angular/core';
import { Covenant, CovenantService } from '../../../services/covenant.service';
import { effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';

@Component({
  standalone: true,
  selector: 'app-covenants',
  imports: [CommonModule, NzDropdownModule],
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

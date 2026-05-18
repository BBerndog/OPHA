import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';
import { Covenant, CovenantService } from '../../services/covenant.service';

@Component({
  standalone: true,
  selector: 'app-restrictions',
  imports: [FormsModule, NzInputNumberModule, NzRadioModule, NzTabsModule],
  templateUrl: './restrictions.html',
  styleUrl: './restrictions.scss',
})
export class Restrictions {
  private covenantService = inject(CovenantService);
  covenants = signal<Covenant[]>([]);
  tabs: Array<{ name: string; content: string; disabled: boolean }> = [];
  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 0;

  constructor() {
    effect(() => {
      this.covenantService.getCovenants().subscribe(covenants => {
        this.covenants.set(covenants);
        this.populateTabs();
      });
    });
  }

  private populateTabs(): void {
    this.tabs = this.covenants().map(covenant => ({
      name: covenant.id.toString() + ' - ' + covenant.covenant,
      content: covenant.description,
      disabled: false
    }));
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {
    console.log(args);
  }
}

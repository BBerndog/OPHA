import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FutureEvents } from '../future-events/future-events';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FutureEvents],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

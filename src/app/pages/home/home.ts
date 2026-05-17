import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FutureEvents } from '../future-events/future-events';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FutureEvents],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

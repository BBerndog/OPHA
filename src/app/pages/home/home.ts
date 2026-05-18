import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FutureEvents } from '../../shared/components/future-events/future-events';
import { Board } from "../../shared/components/board/board";

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FutureEvents, Board],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}

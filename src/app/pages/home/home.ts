import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FutureEvents } from '../../shared/components/future-events/future-events';
import { Board } from "../../shared/components/board/board";
import { MapComponent } from "../../shared/components/map/map";
import { Covenants } from "../../shared/components/covenants/covenants";

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FutureEvents, Board, MapComponent, Covenants],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}

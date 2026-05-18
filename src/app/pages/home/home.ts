import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FutureEvents } from '../../shared/components/future-events/future-events';
import { Board } from "../../shared/components/board/board";
import { Covenants } from "../../shared/components/covenants/covenants";
import { Headlines } from "../../shared/components/headlines/headlines";

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FutureEvents, Board, Covenants, Headlines],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}

import { Component, inject, signal, effect } from '@angular/core';
import { BoardMember, BoardService } from '../../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  private boardService = inject(BoardService);

  members = signal<BoardMember[]>([]);

  constructor() {
    effect(() => {
			this.boardService.getBoardMembers().subscribe(members => {
				this.members.set(members);
			});
		});
	}
}

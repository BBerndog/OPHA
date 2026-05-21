import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { BoardMember, BoardService } from '../../services/board.service';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  private boardService = inject(BoardService);

  members = signal<BoardMember[]>([]);
  president = computed(() => this.members().find(member => member.title === 'President'));

  constructor() {
    this.boardService.getBoardMembers().subscribe(members => {
      this.members.set(members);
    });
  }
}

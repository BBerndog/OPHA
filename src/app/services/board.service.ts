import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface BoardMember {
	title: string;
	name: string;
	email: string;
	phone: string;
}

@Injectable({ providedIn: 'root' })
export class BoardService {
	constructor(private http: HttpClient) {}

	getBoardMembers() {
		return this.http.get<BoardMember[]>('/assets/board.json');
	}
}
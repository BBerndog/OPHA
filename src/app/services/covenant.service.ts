import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Covenant {
	id: number;
	covenant: string;
	description: string;
	descriptionUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CovenantService {
	constructor(private http: HttpClient) {}

	getCovenants(): Observable<Covenant[]> {
		return this.http.get<Covenant[]>('/assets/covenants.json');
	}
}
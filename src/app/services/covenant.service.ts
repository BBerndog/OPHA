import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Covenant {
	id: number;
	covenant: string;
	description: string;
	descriptionUrl?: string;
}

export interface CovenantSection {
	id: string;
	html: string;
}

@Injectable({ providedIn: 'root' })
export class CovenantService {
	constructor(private http: HttpClient) {}

	getCovenants(): Observable<Covenant[]> {
		return this.http.get<Covenant[]>('/assets/covenants.json');
	}

	/** Load the HTML file for a covenant and return clean HTML + parsed sections */
  loadCovenantHtml(url: string): Observable<{ html: string; sections: CovenantSection[] }> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(raw => {
        const clean = this.normalizeHtml(raw);
        const sections = this.splitIntoSections(clean);
        return { html: clean, sections };
      })
    );
  }

	  /** Remove BOM and normalize whitespace */
  private normalizeHtml(html: string): string {
    return html.replace(/\uFEFF/g, '').trim();
  }

  /** Bulletproof section splitter */
  private splitIntoSections(html: string): CovenantSection[] {
    return html
      .split(/(?=<div>)/gi)         // split but keep <div>
      .map(x => x.trim())
      .filter(x => x.startsWith('<div>'))
      .map((block, i) => ({
        id: String.fromCharCode(97 + i), // a, b, c...
        html: block
      }));
  }
}
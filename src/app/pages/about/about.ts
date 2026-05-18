import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from "../../shared/components/map/map";

@Component({
  selector: 'app-about',
  imports: [CommonModule, MapComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}

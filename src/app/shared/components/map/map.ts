import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = L.map('map').setView([39.717773, -86.387656], 15); // Oak Park area

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([39.717773, -86.387656])
      .addTo(map)
      .bindPopup('Oak Park')
      .openPopup();
  }
}
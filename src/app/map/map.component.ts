import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service'
// import { Location } from '../models/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  private map;
  circle;
  locations;

  private initMap(): void {
    this.map = L.map('map').setView([39.8282, -98.5795], 3);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    for (let i = 0; i < this.locations.length; i++) {
      this.circle = new L.circle([this.locations[i].latitude, this.locations[i].longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(this.map);
    }
  }

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.locations = this.mapService.getLocations();
  }

  ngAfterViewInit() {
    this.initMap();
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js'
import { MapService } from './map.service'
// import { Location } from '../models/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  private map;
  heat;
  circle;
  locations;
  heatMapPoints = [];

  private initMap(): void {
    this.map = L.map('map').setView([14.2844133, 102.2565852], 3);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.locations.forEach(element => {
      this.heatMapPoints.push([element.latitude, element.longitude]);
    });

    this.heat = new L.heatLayer(this.heatMapPoints, {
      radius: 11,
      minOpacity: 0.4,
      gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}
    }).addTo(this.map);
  }

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.locations = this.mapService.getLocations();
  }

  ngAfterViewInit() {
    this.initMap();
  }

}

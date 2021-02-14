import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  private map;

  constructor(private dataStorageService: DataStorageService) { }

  private initMap(): void {
    this.map = L.map('map').setView([25, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      noWrap: true
    }).addTo(this.map);
  }

  private plotHeatMapPoints(heatMapPoints) {
    L.heatLayer(heatMapPoints, {
      radius: 8,
      minOpacity: 0.4,
      gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}
    }).addTo(this.map);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
    let numOfDegrees = 20;
    for(let i = -180; i < 180; i+=numOfDegrees) {
      console.log(i);
      this.dataStorageService.fetchLocations(i, i+numOfDegrees-1).then((heatMapPoints) => {
        this.plotHeatMapPoints(heatMapPoints);
      });
    }
  }

}

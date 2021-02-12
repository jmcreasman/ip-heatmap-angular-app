import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { MapService } from '../map/map.service';
import { IGpsLocation } from '../interfaces/IGpsLocation';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private mapService: MapService
  ) {}

  fetchLocations() {
    return this.http
      .get<IGpsLocation[]>(
        'https://ip-heatmap-restful-api.herokuapp.com/iplocations'
      )
      .pipe(
        map(iplocations => {
          let locations = [];
          iplocations.forEach(location => {
            if (location.latitude && location.longitude) {
              locations.push([location.latitude, location.longitude]);
            }
          })
          return locations;
        }),
        tap(locations => {
          this.mapService.setLocations(locations);
        })
      )
  }
}

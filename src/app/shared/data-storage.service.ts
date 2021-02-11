import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { MapService } from '../map/map.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private mapService: MapService
  ) {}

  fetchLocations() {
    return this.http
      .get(
        'http://localhost:3000/iplocations'
      )
      .pipe(
        tap(locations => {
          this.mapService.setLocations(locations);
        })
      )
  }
}

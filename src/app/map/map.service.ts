import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  locations = [
    [11.8166, 122.0942],
    [11.9804, 121.9189],
    [10.7202, 122.5621],
    [11.3889, 122.6277],
    [0.5929, 122.6325]
  ];
  constructor() { }

  getLocations() {
    return this.locations.slice();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  locations;
  constructor() {}

  setLocations(locations) {
    this.locations = locations;
  }

  getLocations() {
    return this.locations.slice();
  }
}

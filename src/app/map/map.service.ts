import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private locations: number[];
  constructor() {}

  setLocations(locations: number[]) {
    this.locations = locations;
  }

  getLocations() {
    return this.locations.slice();
  }
}

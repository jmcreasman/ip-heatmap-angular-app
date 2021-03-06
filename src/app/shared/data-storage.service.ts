import { HttpClient } from '@angular/common/http';
import { IGpsLocation } from '../interfaces/IGpsLocation';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchLocations(minLon: number, maxLon: number) {
    let promise = new Promise<any>((resolve, reject) => {
      let apiURL = `https://ip-heatmap-restful-api.herokuapp.com/iplocations?minLon=${minLon}&maxLon=${maxLon}`;
      this.http.get<IGpsLocation[]>(apiURL)
      .pipe(
        map(iplocations => {
          let locations = [];
          iplocations.forEach(location => {
            locations.push([location.latitude, location.longitude]);
          })
          return locations;
        }),
        catchError(err => {
          console.log(err.message, err.status);
          return throwError(err);
        })
      )
      .toPromise()
      .then(
        locations => { // Success
          resolve(locations);
        }
      ).catch(err => {
        reject(err)
      });
    });
    return promise;
  }
}

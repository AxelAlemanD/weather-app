import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { City } from 'src/app/models/city.dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  getCities(name: string) {
    const url = `${environment.geolocation_url}direct?q=${name}&limit=5&appid=${environment.api_key}`;
    return this.http.get<City[]>(url).pipe(
      map(cities => {
        const formatedCities = cities.map(city => {
          return this.getFormattedCity(city);
        });
        return formatedCities;
      })
    );
  }

  getCity(lat: number, lon: number) {
    const url = `${environment.geolocation_url}reverse?lat=${lat}&lon=${lon}&limit=5&appid=${environment.api_key}`;
    return this.http.get<City[]>(url).pipe(
      map(cities => {
        const formatedCities = cities.map(city => {
          return this.getFormattedCity(city);
        });
        return formatedCities;
      })
    );
  }

  private getFormattedCity(city: any): City {
    return {
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      state: city.state
    };
  }
}

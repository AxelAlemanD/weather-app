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

  getStoredCities(): City[] {
    const cities = localStorage.getItem('cities');
    if (cities) {
      return JSON.parse(cities);
    }
    return [];
  }

  addCity(city: City) {
    let cities = this.getStoredCities();
    let cityIndex = cities.findIndex(storedCity => {
      return (storedCity.lat === city.lat) && (storedCity.lon === city.lon);
    });
    if (cityIndex < 0) {
      cities.push(city);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }

  removeCity(city: any) {
    let cities = this.getStoredCities();
    cities = cities.filter(storedCity => {
      return (storedCity.lat !== city.lat) && (storedCity.lon !== city.lon);
    });
    localStorage.setItem('cities', JSON.stringify(cities));
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

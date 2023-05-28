import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Weather } from 'src/app/models/weather.dto';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number) {
    const url = `${environment.weather_url}weather?lat=${lat}&lon=${lon}&appid=${environment.api_key}`;
    return this.http.get<Weather[]>(url).pipe(
      map(forecast => this.getFormattedWeather(forecast))
    );
  }

  private getFormattedWeather(data: any): Weather {
    return {
      lat: data.coord.lat,
      lon: data.coord.lat,
      main: data.weather[0].main,
      description: data.weather[0].description,
      temp: data.main.temp,
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
      humidity: data.main.humidity,
      rain: data.rain['1h'],
      wind: data.wind.speed,
      updated_at: (new Date()).toString()
    };
  }

}
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
      map(weather => this.getFormattedWeather(weather))
    );
  }

  getForecastForNext5Days(lat: number, lon: number) {
    const url = `${environment.weather_url}forecast?lat=${lat}&lon=${lon}&appid=${environment.api_key}`;
    return this.http.get<Weather[]>(url).pipe(
      map((forecast: any) => {
        let filteredForecast = forecast.list.filter((day: any) => {
          return day.dt_txt.includes('12');
        });
        const formatedDailyForecast = filteredForecast.map((day: any) => {
          return this.getFormattedWeather({ coord: forecast.city.coord, ...day });
        });
        return formatedDailyForecast;
      })
    );
  }

  private getFormattedWeather(data: any): Weather {
    let rain: number = 0;

    if (data.rain) {
      rain = (data.rain['1h']) ? data.rain['1h'] : data.rain['3h'];
    }

    return {
      lat: data.coord.lat,
      lon: data.coord.lat,
      main: data.weather[0].main,
      description: data.weather[0].description,
      temp: data.main.temp,
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
      humidity: data.main.humidity,
      rain,
      wind: data.wind.speed,
      date: new Date(data.dt * 1000),
      updated_at: new Date()
    };
  }

}
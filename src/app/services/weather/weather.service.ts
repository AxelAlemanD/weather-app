import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Weather } from 'src/app/models/weather.dto';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public lastUpdate: Date = new Date();

  constructor(private http: HttpClient) {
    let value = localStorage.getItem('last_update');
    if (value) {
      this.lastUpdate = new Date(value);
    } else { 
      this.lastUpdate = new Date();
    }
  }

  getCurrentWeather(lat: number, lon: number) {
    const url = `${environment.weather_url}weather?lat=${lat}&lon=${lon}&appid=${environment.api_key}`;
    return this.http.get<Weather[]>(url).pipe(
      map(weather => {
        this.updateDateOfLastUpdate();
        return this.getFormattedWeather(weather);
      })
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
        this.updateDateOfLastUpdate();
        return formatedDailyForecast;
      })
    );
  }

  getStoredWeathers(): Weather[] {
    let weathers: any = localStorage.getItem('weathers');
    if (weathers) {
      weathers = JSON.parse(weathers);
      if (weathers) {
        return weathers.map((weather: Weather) => {
          return {
            ...weather,
            date: new Date(weather.date)
          };
        });
      }
    }
    return [];
  }

  addWeather(weather: Weather) {
    let weathers = this.getStoredWeathers();
    let weatherIndex = weathers.findIndex(storedWeather => {
      return (storedWeather.lat === weather.lat) && (storedWeather.lon === weather.lon) && (storedWeather.date.toLocaleString() === weather.date.toLocaleString());
    });

    if (typeof weather.date !== 'string') {
      weather.date = weather.date.toISOString();
    }

    if (weatherIndex < 0) {
      weathers.push(weather);
    } else {
      weathers[weatherIndex] = weather;
    }

    localStorage.setItem('weathers', JSON.stringify(weathers));
  }

  removeWeather(weather: Weather) {
    let weathers = this.getStoredWeathers();
    weathers = weathers.filter(storedWeather => {
      return (storedWeather.lat !== weather.lat) && (storedWeather.lon !== weather.lon) && (storedWeather.date.toLocaleString() !== weather.date.toLocaleString());
    });
    localStorage.setItem('weathers', JSON.stringify(weathers));
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

  private updateDateOfLastUpdate() {
    this.lastUpdate = new Date();
    localStorage.setItem('last_update', this.lastUpdate.toISOString());
  }

}
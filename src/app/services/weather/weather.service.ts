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
    const url = `${environment.weather_url}weather?lat=${lat}&lon=${lon}&appid=${environment.api_key}&units=imperial`;
    return this.http.get<Weather[]>(url).pipe(
      map(weather => {
        this.updateDateOfLastUpdate();
        return this.getFormattedWeather(weather);
      })
    );
  }

  getForecastForNext5Days(lat: number, lon: number) {
    const url = `${environment.weather_url}forecast?lat=${lat}&lon=${lon}&appid=${environment.api_key}&units=imperial`;
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
      image_name: this.getImageName(data.weather[0].icon),
      date: new Date(data.dt * 1000),
      updated_at: new Date()
    };
  }

  // Icons code in: https://openweathermap.org/weather-conditions
  private getImageName(icon: string): string {
    if (icon === '01d') { return 'clear-sky-day.svg'; }
    if (icon === '01n') { return 'clear-sky-night.svg'; }
    if (icon === '02d') { return 'few-clouds-day.svg'; }
    if (icon === '02n') { return 'few-clouds-night.svg'; }
    if (icon === '03d' || icon === '03n') { return 'scattered-clouds.svg'; }
    if (icon === '04d' || icon === '04n') { return 'broken-clouds.svg'; }
    if (icon === '09d' || icon === '09n') { return 'shower-rain.svg'; }
    if (icon === '10d' || icon === '10n') { return 'rain.svg'; }
    if (icon === '11d' || icon === '11n') { return 'thunderstorm.svg'; }
    if (icon === '13d' || icon === '13n') { return 'snow.svg'; }
    return 'clear-sky-day.svg';
  }

  private updateDateOfLastUpdate() {
    this.lastUpdate = new Date();
    localStorage.setItem('last_update', this.lastUpdate.toISOString());
  }

}
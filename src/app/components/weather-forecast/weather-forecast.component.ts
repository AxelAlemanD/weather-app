import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Alerts } from 'src/app/shared/utils/alerts.util';
import { Statuses } from 'src/app/shared/utils/statuses.enum';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  currentWeather: Weather | undefined;
  forecast: Weather[] = [];
  @Input() city: City | undefined;
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.updateWeather();
  }

  async updateWeather(): Promise<Statuses> {
    if (this.city) {
      let status = Statuses.Loading;
      status = await this.loadCurrentWeather(this.city.lat, this.city.lon);

      if (status !== Statuses.Error) {
        status = await this.loadForecast(this.city.lat, this.city.lon);
      }

      return new Promise<Statuses>((resolve, reject) => {
        if (status === Statuses.Done) {
          resolve(status);
        } else {
          Alerts.showNetworkErrorToast();
          reject(status);
        }
      });
    }

    return new Promise<Statuses>((reject) => reject(Statuses.Error));
  }

  private loadCurrentWeather(lat: number, lon: number): Promise<Statuses> {
    const promise = new Promise<Statuses>((resolve, reject) => {
      this.weatherService.getCurrentWeather(lat, lon).subscribe({
        next: (weather: Weather) => {
          this.weatherService.addWeather(weather);
          this.currentWeather = weather;
          resolve(Statuses.Done);
        },
        error: (e) => reject(Statuses.Error),
      });
    });
    return promise;
  }

  private loadForecast(lat: number, lon: number): Promise<Statuses> {
    const promise = new Promise<Statuses>((resolve, reject) => {
      this.weatherService.getForecastForNext5Days(lat, lon).subscribe({
        next: (forecast: Weather[]) => {
          this.forecast = forecast;
          resolve(Statuses.Done);
        },
        error: (e) => reject(Statuses.Error),
      });
    });
    return promise;
  }

  preventSlideChange(event: any) {
    this.onClickEvent.emit(event.type);
  }

}

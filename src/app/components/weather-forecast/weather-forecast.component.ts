import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Alerts } from 'src/app/shared/utils/alerts.util';
import { Statuses } from 'src/app/shared/utils/statuses.enum';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  forecast: Weather[] = [];
  @Input() city: City | undefined;
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild('currentWeater') currentWeaterRef: CurrentWeatherComponent | undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.updateWeather();
  }

  async updateWeather(): Promise<Statuses> {
    if (this.city) {
      let status: Statuses | undefined = Statuses.Loading;
      status = await this.currentWeaterRef?.loadCurrentWeather(this.city.lat, this.city.lon);

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherStatus } from 'src/app/shared/weather-status.enum';

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

  updateWeather() {
    if (this.city) {
      this.loadCurrentWeather(this.city.lat, this.city.lon);
      this.loadForecast(this.city.lat, this.city.lon);
    }
  }

  private loadCurrentWeather(lat: number, lon: number) {
    this.weatherService.getCurrentWeather(lat, lon).subscribe(weather => {
      this.weatherService.addWeather(weather);
      this.currentWeather = weather;
    });
  }

  private loadForecast(lat: number, lon: number) {
    this.weatherService.getForecastForNext5Days(lat, lon).subscribe(forecast => {
      this.forecast = forecast;
      this.weatherService.changeServiceStatus(WeatherStatus.Initial);
    });
  }

  preventSlideChange(event: any) {
    this.onClickEvent.emit(event.type);
  }

}

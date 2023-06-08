import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { TemperatureScales } from 'src/app/shared/utils/temperatureScales.enum';

@Component({
  selector: 'app-city-weather-card',
  templateUrl: './city-weather-card.component.html',
  styleUrls: ['./city-weather-card.component.scss']
})
export class CityWeatherCardComponent implements OnInit {

  activeTemperatureScale: TemperatureScales = TemperatureScales.Fahrenheit;
  weather: Weather | undefined;
  @Input() city: City | undefined;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private temperatureScaleService: TemperatureScaleService
  ) { }

  ngOnInit(): void {
    this.loadCurrentWeather();
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeTemperatureScale = scale;
    });
  }

  showCity(city: City | undefined) {
    if (city) {
      this.router.navigate(['/city', city.lat, city.lon]);
    }
  }

  private loadCurrentWeather() {
    if (this.city) {
      this.weatherService.getCurrentWeather(this.city.lat, this.city.lon)
        .subscribe(weather => this.weather = weather);
    }
  }
}

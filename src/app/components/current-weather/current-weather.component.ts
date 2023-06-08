import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { TemperatureScales } from 'src/app/shared/utils/temperatureScales.enum';
import { Statuses } from 'src/app/shared/utils/statuses.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  activeTemperatureScale: TemperatureScales = TemperatureScales.Fahrenheit;
  weather: Weather | undefined;
  @Input() city: City | undefined;

  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService,
    private temperatureScaleService: TemperatureScaleService
  ) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeTemperatureScale = scale;
    });

    if (this.city) {
      this.loadStoredWeather(this.city.lat, this.city.lon);
      this.loadCurrentWeather(this.city.lat, this.city.lon);
    }
  }

  loadCurrentWeather(lat: number, lon: number): Promise<Statuses> {
    const promise = new Promise<Statuses>((resolve, reject) => {
      this.weatherService.getCurrentWeather(lat, lon).subscribe({
        next: (weather: Weather) => {
          this.weather = weather;
          if (this.geolocationService.isCityStored(this.city as City)) {
            this.weatherService.addWeather(weather);
          }
          resolve(Statuses.Done);
        },
        error: (e) => reject(Statuses.Error),
      });
    });
    return promise;
  }

  private loadStoredWeather(lat: number, lon: number) {
    let storedWeather = this.weatherService.getStoredCityWeather(lat, lon);
    if (storedWeather) {
      this.weather = storedWeather;
    }
  }

}

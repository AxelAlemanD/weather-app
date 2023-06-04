import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Scales } from 'src/app/shared/utils/scales.enum';
import { Statuses } from 'src/app/shared/utils/statuses.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  activeScale: Scales = Scales.Fahrenheit;
  weather: Weather | undefined;
  @Input() city: City | undefined;

  constructor(
    private weatherService: WeatherService,
    private temperatureScaleService: TemperatureScaleService
  ) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeScale = scale;
    });
    
    if (this.city) {
      this.loadCurrentWeather(this.city.lat, this.city.lon);
    }
  }

  loadCurrentWeather(lat: number, lon: number): Promise<Statuses> {
    const promise = new Promise<Statuses>((resolve, reject) => {
      this.weatherService.getCurrentWeather(lat, lon).subscribe({
        next: (weather: Weather) => {
          this.weatherService.addWeather(weather);
          this.weather = weather;
          resolve(Statuses.Done);
        },
        error: (e) => reject(Statuses.Error),
      });
    });
    return promise;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { Scales } from 'src/app/shared/utils/scales.enum';

@Component({
  selector: 'app-daily-forecast-card',
  templateUrl: './daily-forecast-card.component.html',
  styleUrls: ['./daily-forecast-card.component.scss']
})
export class DailyForecastCardComponent implements OnInit {

  activeScale: Scales = Scales.Fahrenheit;
  @Input() city: City | undefined;
  @Input() weather: Weather | undefined;

  constructor(
    private router: Router,
    private temperatureScaleService: TemperatureScaleService
  ) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeScale = scale;
    });
  }

  showCity(city: City | undefined) {
    if (city) {
      this.router.navigate(['/city', city.lat, city.lon]);
    }
  }

}

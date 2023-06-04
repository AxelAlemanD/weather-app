import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { Scales } from 'src/app/shared/utils/scales.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  activeScale: Scales = Scales.Fahrenheit;
  @Input() city: City | undefined;
  @Input() weather: Weather | undefined;

  constructor(private temperatureScaleService: TemperatureScaleService) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeScale = scale;
    });
  }

}

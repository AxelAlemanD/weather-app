import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather.dto';
import { SpeedScaleService } from 'src/app/services/speed-scale/speed-scale.service';
import { SpeedScales } from 'src/app/shared/utils/speedScales.enum';

@Component({
  selector: 'app-weather-details-card',
  templateUrl: './weather-details-card.component.html',
  styleUrls: ['./weather-details-card.component.scss']
})
export class WeatherDetailsCardComponent implements OnInit {

  activeSpeedScale: SpeedScales = SpeedScales.Mph;
  @Input() weather: Weather | undefined;
  @Input() showIcons: boolean = false;

  constructor(private speedScaleService: SpeedScaleService) { }

  ngOnInit(): void { 
    this.speedScaleService.activeScale.subscribe(scale => {
      this.activeSpeedScale = scale;
    });
  }

}

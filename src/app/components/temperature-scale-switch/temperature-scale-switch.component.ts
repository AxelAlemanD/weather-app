import { Component, OnInit } from '@angular/core';
import { SpeedScaleService } from 'src/app/services/speed-scale/speed-scale.service';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { SpeedScales } from 'src/app/shared/utils/speedScales.enum';
import { TemperatureScales } from 'src/app/shared/utils/temperatureScales.enum';

@Component({
  selector: 'app-temperature-scale-switch',
  templateUrl: './temperature-scale-switch.component.html',
  styleUrls: ['./temperature-scale-switch.component.scss']
})
export class TemperatureScaleSwitchComponent implements OnInit {

  activeTemperatureScale: TemperatureScales = TemperatureScales.Fahrenheit;

  constructor(
    private temperatureScaleService: TemperatureScaleService,
    private speedScaleService: SpeedScaleService
  ) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeTemperatureScale = scale;
    });
  }

  toggleTemperatureScale(event: any) {
    let temperatureScale = this.getTemperatureScale(event.target.checked);
    let speedScale = this.getSpeedScale(event.target.checked);
    this.temperatureScaleService.changeScale(temperatureScale);
    this.speedScaleService.changeScale(speedScale);
  }

  private getTemperatureScale(isChecked: boolean): TemperatureScales {
    return (isChecked)
      ? TemperatureScales.Fahrenheit
      : TemperatureScales.Celsius;
  }

  private getSpeedScale(isChecked: boolean): SpeedScales {
    return (isChecked)
      ? SpeedScales.Mph
      : SpeedScales.Kmh;
  }

}

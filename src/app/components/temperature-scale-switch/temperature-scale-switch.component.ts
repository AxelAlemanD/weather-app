import { Component, OnInit } from '@angular/core';
import { TemperatureScaleService } from 'src/app/services/temperature-scale/temperature-scale.service';
import { Scales } from 'src/app/shared/utils/scales.enum';

@Component({
  selector: 'app-temperature-scale-switch',
  templateUrl: './temperature-scale-switch.component.html',
  styleUrls: ['./temperature-scale-switch.component.scss']
})
export class TemperatureScaleSwitchComponent implements OnInit {

  activeScale: Scales = Scales.Fahrenheit;

  constructor(private temperatureScaleService: TemperatureScaleService) { }

  ngOnInit(): void {
    this.temperatureScaleService.activeScale.subscribe(scale => {
      this.activeScale = scale;
    });
   }

  toggleTemperatureScale(event: any) {
    let scale: Scales = (event.target.checked) ? Scales.Fahrenheit : Scales.Celsius;
    this.temperatureScaleService.changeScale(scale);
  }
}

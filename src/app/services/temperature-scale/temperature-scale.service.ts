import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemperatureScales } from 'src/app/shared/utils/temperatureScales.enum';

@Injectable({
  providedIn: 'root'
})
export class TemperatureScaleService {

  private originScale = new BehaviorSubject<TemperatureScales>(TemperatureScales.Fahrenheit);
  public activeScale = this.originScale.asObservable();

  constructor() { }

  changeScale(scale: TemperatureScales) {
    this.originScale.next(scale);
    this.setPreferredScale(scale);
  }

  getPreferredScale(): TemperatureScales {
    let scale = localStorage.getItem('scale');
    if (scale) {
      return (scale === 'F') 
        ? TemperatureScales.Fahrenheit 
        : TemperatureScales.Celsius;
    }
    return TemperatureScales.Fahrenheit;
  }

  private setPreferredScale(scale: TemperatureScales) {
    localStorage.setItem('scale', scale);
  }

}
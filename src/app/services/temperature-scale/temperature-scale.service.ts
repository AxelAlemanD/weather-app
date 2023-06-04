import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scales } from 'src/app/shared/utils/scales.enum';

@Injectable({
  providedIn: 'root'
})
export class TemperatureScaleService {

  private originScale = new BehaviorSubject<Scales>(Scales.Fahrenheit);
  public activeScale = this.originScale.asObservable();

  constructor() { }

  changeScale(scale: Scales) {
    this.originScale.next(scale);
    this.setPreferredScale(scale);
  }

  getPreferredScale(): Scales {
    let scale = localStorage.getItem('scale');
    if (scale) {
      return (scale === 'F') ? Scales.Fahrenheit : Scales.Celsius;
    }
    return Scales.Fahrenheit;
  }

  private setPreferredScale(scale: Scales) {
    localStorage.setItem('scale', scale);
  }

}
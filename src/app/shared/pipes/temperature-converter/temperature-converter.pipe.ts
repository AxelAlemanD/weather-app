import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureScales } from '../../utils/temperatureScales.enum';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(fahrenheit: number | undefined, unit: TemperatureScales): number {
    if (fahrenheit && fahrenheit > 0) {
      return (unit === 'C')
        ? this.convertToFahrenheitToCelsius(fahrenheit)
        : Math.round(fahrenheit);
    }
    return 0;
  }

  private convertToFahrenheitToCelsius(fahrenheit: number): number {
    let celsius = (fahrenheit - 32) / 1.8;
    return Math.round(celsius);
  }

}
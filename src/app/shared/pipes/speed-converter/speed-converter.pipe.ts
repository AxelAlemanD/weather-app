import { Pipe, PipeTransform } from '@angular/core';
import { SpeedScales } from '../../utils/speedScales.enum';

@Pipe({
  name: 'speedConverter'
})
export class SpeedConverterPipe implements PipeTransform {

  transform(mph: number | undefined, unit: SpeedScales): number {
    if (mph && mph > 0) {
      return (unit === 'KM/H')
        ? this.convertToMphToKmh(mph)
        : Math.round(mph);
    }
    return 0;
  }

  private convertToMphToKmh(mph: number): number {
    let kmh = mph * 1.6093;
    return Math.round(kmh);
  }

}

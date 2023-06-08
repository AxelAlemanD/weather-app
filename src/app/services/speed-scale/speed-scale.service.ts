import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpeedScales } from 'src/app/shared/utils/speedScales.enum';

@Injectable({
  providedIn: 'root'
})
export class SpeedScaleService {

  private originScale = new BehaviorSubject<SpeedScales>(SpeedScales.Mph);
  public activeScale = this.originScale.asObservable();

  constructor() { }

  changeScale(scale: SpeedScales) {
    this.originScale.next(scale);
  }

}

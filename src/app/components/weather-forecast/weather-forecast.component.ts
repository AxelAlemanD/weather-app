import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  @Output() onClickEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  preventSlideChange(event: any) {
    this.onClickEvent.emit(event.type);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourly-weather-card',
  templateUrl: './hourly-weather-card.component.html',
  styleUrls: ['./hourly-weather-card.component.scss']
})
export class HourlyWeatherCardComponent implements OnInit {

  hour = new Date();

  constructor() { }

  ngOnInit(): void {
    console.info('Component start');
  }

}

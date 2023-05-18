import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast-card',
  templateUrl: './weather-forecast-card.component.html',
  styleUrls: ['./weather-forecast-card.component.scss']
})
export class WeatherForecastCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.info('Component start');
  }
  
}

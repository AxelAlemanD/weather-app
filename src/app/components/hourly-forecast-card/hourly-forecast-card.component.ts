import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast-card',
  templateUrl: './hourly-forecast-card.component.html',
  styleUrls: ['./hourly-forecast-card.component.scss']
})
export class HourlyForecastCardComponent implements OnInit {

  hour = new Date();

  constructor() { }

  ngOnInit(): void {
    console.info('Component start');
  }

}

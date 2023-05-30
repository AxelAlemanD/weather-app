import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';

@Component({
  selector: 'app-daily-forecast-card',
  templateUrl: './daily-forecast-card.component.html',
  styleUrls: ['./daily-forecast-card.component.scss']
})
export class DailyForecastCardComponent implements OnInit {

  @Input() city: City | undefined;
  @Input() weather: Weather | undefined;

  constructor() { }

  ngOnInit(): void { }

}

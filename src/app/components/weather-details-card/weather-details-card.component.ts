import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather.dto';

@Component({
  selector: 'app-weather-details-card',
  templateUrl: './weather-details-card.component.html',
  styleUrls: ['./weather-details-card.component.scss']
})
export class WeatherDetailsCardComponent implements OnInit {

  @Input() weather: Weather | undefined;
  @Input() showIcons: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}

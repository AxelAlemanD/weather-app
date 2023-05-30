import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.dto';
import { Weather } from 'src/app/models/weather.dto';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() city: City | undefined;
  @Input() weather: Weather | undefined;

  constructor() { }

  ngOnInit(): void { }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-details-card',
  templateUrl: './weather-details-card.component.html',
  styleUrls: ['./weather-details-card.component.scss']
})
export class WeatherDetailsCardComponent implements OnInit {

  @Input() showIcons: boolean = false;

  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

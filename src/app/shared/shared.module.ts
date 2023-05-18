import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { WeatherForecastCardComponent } from '../components/weather-forecast-card/weather-forecast-card.component';
import { HourlyWeatherCardComponent } from '../components/hourly-weather-card/hourly-weather-card.component';

@NgModule({
  declarations: [
    WeatherForecastCardComponent,
    HourlyWeatherCardComponent
  ],
  exports: [
    WeatherForecastCardComponent,
    HourlyWeatherCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }

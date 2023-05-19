import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { WeatherForecastCardComponent } from '../components/weather-forecast-card/weather-forecast-card.component';
import { HourlyWeatherCardComponent } from '../components/hourly-weather-card/hourly-weather-card.component';
import { WeatherDetailsCardComponent } from '../components/weather-details-card/weather-details-card.component';
import { TemperatureScaleSwitchComponent } from '../components/temperature-scale-switch/temperature-scale-switch.component';

@NgModule({
  declarations: [
    WeatherForecastCardComponent,
    HourlyWeatherCardComponent,
    WeatherDetailsCardComponent,
    TemperatureScaleSwitchComponent
  ],
  exports: [
    WeatherForecastCardComponent,
    HourlyWeatherCardComponent,
    WeatherDetailsCardComponent,
    TemperatureScaleSwitchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }

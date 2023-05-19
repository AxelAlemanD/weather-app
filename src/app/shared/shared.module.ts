import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { DailyForecastCardComponent } from '../components/daily-forecast-card/daily-forecast-card.component';
import { HourlyForecastCardComponent } from '../components/hourly-forecast-card/hourly-forecast-card.component';
import { WeatherDetailsCardComponent } from '../components/weather-details-card/weather-details-card.component';
import { TemperatureScaleSwitchComponent } from '../components/temperature-scale-switch/temperature-scale-switch.component';
import { CurrentWeatherComponent } from '../components/current-weather/current-weather.component';
import { WeatherForecastComponent } from '../components/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    WeatherForecastComponent,
    CurrentWeatherComponent,
    DailyForecastCardComponent,
    HourlyForecastCardComponent,
    WeatherDetailsCardComponent,
    TemperatureScaleSwitchComponent
  ],
  exports: [
    WeatherForecastComponent,
    CurrentWeatherComponent,
    DailyForecastCardComponent,
    HourlyForecastCardComponent,
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

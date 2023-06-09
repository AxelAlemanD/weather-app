import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { City } from '../../models/city.dto';
import { WeatherForecastComponent } from '../../components/weather-forecast/weather-forecast.component';
import { WeatherService } from '../../services/weather/weather.service';
import { Alerts } from 'src/app/shared/utils/alerts.util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  lastUpdate = new Date();
  currentSlide: number = 0;
  cities: City[] = [];
  isUpdatingWeather: boolean = false;
  @ViewChildren(WeatherForecastComponent) weatherForecastList!: QueryList<WeatherForecastComponent>;
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.loadLocations();
    this.lastUpdate = this.weatherService.lastUpdate;
  }

  ionViewWillEnter() {
    this.loadStoredCities();
    this.updateWeatherForecast();
  }

  private async loadLocations() {
    try {
      let currentCity = await this.geolocationService.getCurrentLocation();
      this.geolocationService.getCity(currentCity.lat, currentCity.lon).subscribe({
        next: (city: City[]) => this.geolocationService.addCity(city[0]),
        error: (e) => Alerts.showNetworkErrorToast(),
        complete: () => this.loadStoredCities(),
      });
    } catch (error: any) {
      Alerts.showToast(error.message, 2000, 'top', 'warning');
    } finally {
      this.loadStoredCities();
    }
  }

  updateCurrentSlide() {
    this.currentSlide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  async updateWeatherForecast() {
    this.isUpdatingWeather = true;
    const promises = this.weatherForecastList.map(item => item.updateWeather());
    await Promise.all(promises);
    this.isUpdatingWeather = false;
    this.lastUpdate = this.weatherService.lastUpdate;
  }

  preventSlideChange(eventType: string) {
    if (eventType === "touchstart") {
      this.swiperRef?.nativeElement.swiper.disable();
    } else if (eventType === "touchend") {
      this.swiperRef?.nativeElement.swiper.enable();
    }
  }

  showSlide(index: number) {
    this.swiperRef?.nativeElement.swiper.slideTo(index);
  }

  private loadStoredCities() {
    this.cities = this.geolocationService.getStoredCities();
  }

}

import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { City } from '../../models/city.dto';
import { WeatherForecastComponent } from '../../components/weather-forecast/weather-forecast.component';
import { Statuses } from '../../shared/statuses.enum';
import { WeatherService } from '../../services/weather/weather.service';

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

  private async loadLocations() {
    let currentCity = await this.geolocationService.getCurrentLocation();
    this.geolocationService.getCity(currentCity.lat, currentCity.lon).subscribe(city => {
      this.geolocationService.addCity(city[0]);
      this.cities = this.geolocationService.getStoredCities();
    });
  }

  updateCurrentSlide() {
    this.currentSlide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  updateWeatherForecast() {
    this.weatherService.changeServiceStatus(Statuses.Loading);
    this.weatherService.activeStatus.subscribe(status => {
      if (status === Statuses.Loading) {
        this.isUpdatingWeather = true;
      } else if (status === Statuses.Done) {
        this.isUpdatingWeather = false;
        this.lastUpdate = this.weatherService.lastUpdate;
      }
    });
    this.weatherForecastList.forEach(item => item.updateWeather());
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

}

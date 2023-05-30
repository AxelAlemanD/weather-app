import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { City } from '../models/city.dto';
import { WeatherForecastComponent } from '../components/weather-forecast/weather-forecast.component';
import { WeatherStatus } from '../shared/weather-status.enum';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class HomePage implements OnInit {

  lastUpdate = new Date();
  currentSlide: number = 0;
  showCitySearchResults: boolean = false;
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

  toggleCitySearchResultsComponent(event: any) {
    this.showCitySearchResults = (event.type === "ionFocus" && event.type !== "ionCancel");
  }

  updateCurrentSlide() {
    this.currentSlide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  updateWeatherForecast() {
    this.weatherService.changeServiceStatus(WeatherStatus.Updating);
    this.weatherService.activeStatus.subscribe(status => {
      if (status === WeatherStatus.Updating) {
        this.isUpdatingWeather = true;
      } else if (status === WeatherStatus.Initial) {
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

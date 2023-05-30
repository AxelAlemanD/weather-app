import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { WeatherService } from '../services/weather/weather.service';
import { City } from '../models/city.dto';

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
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.loadLocations();
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
    this.lastUpdate = new Date();
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

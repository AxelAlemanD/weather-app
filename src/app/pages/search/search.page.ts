import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, merge } from 'rxjs';
import { City } from 'src/app/models/city.dto';
import { CityAndWeather } from 'src/app/models/cityAndWeather.dto';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { Statuses } from 'src/app/shared/utils/statuses.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  storedCities: City[] = [];
  citiesAndWeatherFound: CityAndWeather[] = [];
  cities: City[] = [];
  status: Statuses = Statuses.Done;
  statuses = Statuses;
  private searchbar: any;

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.loadStoredCities();
  }

  ionViewDidEnter() {
    this.searchbar = document.querySelector('ion-searchbar');
    if (this.searchbar) {
      fromEvent(this.searchbar, 'ionChange')
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.clearLastResults();
          this.searchCities();
        });

      merge(
        fromEvent(this.searchbar, 'ionClear'),
        fromEvent(this.searchbar, 'ionCancel')
      ).subscribe(() => {
        this.clearLastResults();
        this.status = Statuses.Done;
      });
    }
  }

  searchCities() {
    if (this.searchbar.value !== '') {
      this.status = Statuses.Loading;
      this.geolocationService.getCities(this.searchbar.value).subscribe({
        next: (cities: City[]) => { 
          this.cities = cities; 
          this.status = Statuses.Done;
        },
        error: (e) => this.status = Statuses.Error,
      });
    } else {
      this.clearLastResults();
    }
  }

  private loadStoredCities() {
    this.storedCities = this.geolocationService.getStoredCities();
  }

  private clearLastResults() {
    this.cities = [];
  }

}

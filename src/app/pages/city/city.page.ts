import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.dto';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  city: City | undefined;
  isCityStored: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    let lat = this.route.snapshot.params['lat'];
    let lon = this.route.snapshot.params['lon'];
    if (lat && lon) {
      this.loadCity(Number.parseFloat(lat), Number.parseFloat(lon));
    }
  }

  private loadCity(lat: number, lon: number) {
    this.geolocationService.getCity(lat, lon)
    .subscribe(city => {
      this.city = city[0];
      this.isCityStored = this.geolocationService.isCityStored(this.city);
    });
  }

  goBack() {
    this.location.back();
  }

  addToList() {
    if (this.city) {
      this.geolocationService.addCity(this.city);
      this.isCityStored = this.geolocationService.isCityStored(this.city);
    }
  }

  removeFromTheList() {
    if (this.city) {
      this.geolocationService.removeCity(this.city);
      this.isCityStored = this.geolocationService.isCityStored(this.city);
    }
  }

}
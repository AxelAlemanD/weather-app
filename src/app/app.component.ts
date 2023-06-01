import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showCitySearchResults: boolean = false;

  constructor(private router: Router) { }

  toggleCitySearchResultsComponent(event: any) {
    this.showCitySearchResults = (event.type === "ionFocus" && event.type !== "ionCancel");
    if (this.showCitySearchResults) {
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}

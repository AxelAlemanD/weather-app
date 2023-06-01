import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  currentRoute: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  togglePageToShow(event: any) {
    this.router.navigate([this.getRouteNameToDisplay(event)]);
  }

  private getRouteNameToDisplay(event: any): string {
    return (event.type === "ionCancel") ? '/home' : '/search';
  }
}

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'map-page',
  imports: [HeaderComponent],
  standalone: true,
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined; 
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;

  constructor() { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map', 
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 9,
      accessToken: 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw'
    });

  }
}

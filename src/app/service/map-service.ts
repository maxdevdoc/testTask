import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import mapboxgl from "mapbox-gl";

@Injectable({
  providedIn: "root",
})
export class MapService {
  map: mapboxgl.Map | undefined;

  constructor() {}

  getMap() {
    (mapboxgl as any).accessToken =
      "pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw";

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-87.61694, 41.86625],
      zoom: 15.99,
      pitch: 40,
      bearing: 20,
      antialias: true,
    });
    return this.map;
  }
}

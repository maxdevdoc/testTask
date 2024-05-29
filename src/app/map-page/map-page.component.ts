import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { HeaderComponent } from "../shared/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

@Component({
  selector: "map-page",
  standalone: true,
  imports: [HeaderComponent, MatIconModule],
  templateUrl: "./map-page.component.html",
  styleUrls: ["./map-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  draw: MapboxDraw | undefined;
  style = "mapbox://styles/mapbox/streets-v11";
  lat: number = 30.2672;
  lng: number = -97.7431;

  constructor() {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      "pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw";

    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 9,
    });

    // this.map.on("load", () => {
    //   this.draw = new MapboxDraw({
    //     displayControlsDefault: true,
    //     controls: {
    //       polygon: true,
    //       line_string: true,
    //       point: true,
    //       trash: true,
    //       combine_features: true,
    //       uncombine_features: true,
    //     },
    //     defaultMode: "draw_polygon",
    //   });
    //   this.map?.addControl(this.draw, "top-right");
    // });

    this.map.addControl(new MapboxDraw, 'top-left')
  }
}

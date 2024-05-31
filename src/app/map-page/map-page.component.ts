import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { HeaderComponent } from "../shared/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { FormsModule, NgModel } from "@angular/forms";
import { MapService } from "../service/map-service";

@Component({
  selector: "map-page",
  standalone: true,
  imports: [HeaderComponent, MatIconModule, FormsModule],
  templateUrl: "./map-page.component.html",
  styleUrls: ["./map-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  draw: MapboxDraw = new MapboxDraw();
  style = "mapbox://styles/mapbox/streets-v11";
  lat: number = 30.2672;
  lng: number = -97.7431;
  heightPolygon = 0;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.map = this.mapService.getMap();
    // (mapboxgl as any).accessToken =
    //   "pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw";

    // this.map = new mapboxgl.Map({
    //   container: "map",
    //   style: "mapbox://styles/mapbox/streets-v12",
    //   center: [-87.61694, 41.86625],
    //   zoom: 15.99,
    //   pitch: 40,
    //   bearing: 20,
    //   antialias: true,
    // });

    this.map.on("load", () => {
      this.map?.addSource("drawn-polygons", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      this.map?.addLayer({
        id: "drawn-polygons-layer",
        type: "fill-extrusion",
        source: "drawn-polygons",
        paint: {
          "fill-extrusion-color": "#888",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-opacity": 0.5,
        },
      });
    });

    this.map.addControl(this.draw, "top-left");

    this.map.on("draw.selectionchange", this.updateSelectedHeight.bind(this));
  }

  updateSelectedHeight() {
    this.heightPolygon =
      this.draw?.getSelected().features[0].properties?.["height"] ?? 0;
  }

  updateHeight() {
    const allPolygons = this.draw?.getAll();
    const selectedIds = this.draw?.getSelectedIds();
    if (selectedIds.length === 0) {
      alert("Select any polygon.");
    } else {
      allPolygons.features.forEach((feature: any) => {
        if (selectedIds.includes(feature.id)) {
          feature.properties.height = this.heightPolygon;
        }
      });
      this.draw.set(allPolygons);
      (this.map!.getSource("drawn-polygons") as mapboxgl.GeoJSONSource).setData(
        allPolygons
      );
    }
  }
}

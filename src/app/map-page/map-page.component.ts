import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

@Component({
  selector: 'map-page',
  imports: [HeaderComponent],
  standalone: true,
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  draw: MapboxDraw | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 9
    });

    this.map.on('load', () => {
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
        defaultMode: 'draw_polygon'
      });
      this.map?.addControl(this.draw);

      this.map?.on('draw.create', this.updatePolygons.bind(this));
      this.map?.on('draw.delete', this.updatePolygons.bind(this));
      this.map?.on('draw.update', this.updatePolygons.bind(this));
    });
  }

  updatePolygons(e: any) {
    const data = this.draw?.getAll();
    if (data) {
      const source = this.map?.getSource('polygons') as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData(data);
      } else {
        this.map?.addSource('polygons', {
          type: 'geojson',
          data: data
        });

        this.map?.addLayer({
          id: 'polygons',
          type: 'fill-extrusion',
          source: 'polygons',
          paint: {
            'fill-extrusion-color': '#888',
            'fill-extrusion-height': [
              'case',
              ['boolean', ['feature-state', 'extrude'], false],
              ['get', 'height'],
              0
            ]
          }
        });
      }
    }
  }

  setExtrudeHeight(event: Event) {
    const height = (event.target as HTMLInputElement).value;
    const selectedFeatures = this.draw?.getSelected();
    if (selectedFeatures) {
      selectedFeatures.features.forEach(feature => {
        if (!feature.properties) {
          feature.properties = {};
        }
        (feature.properties as any).height = +height;
      });
      this.updatePolygons(null);
    }
  }


  deleteSelectedPolygons() {
    const selectedFeatures = this.draw?.getSelected();
    if (selectedFeatures && selectedFeatures.features.length > 0) {
      const ids = selectedFeatures.features
        .map(feature => feature.id)
        .filter((id): id is string => typeof id === 'string'); // Фильтруем только строки
  
      // Remove selected features directly from Mapbox Draw
      this.draw?.delete(ids);
    }
  }
  }
  
  


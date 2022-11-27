import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '../interface';
import { HttpClient } from '@angular/common/http';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: any;
  locations: Location[] = [];
  apiURL =
    'https://272.selfip.net/apps/E1uq9AFJb3/collections/locations/documents/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.http.get<Location[]>(this.apiURL).subscribe({
      next: (data) => {
        // console.log(data);
        this.locations = data;
        // this.createMap(); //TODO: uncomment when testing maps API
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  createMap(): void {
    this.map = L.map('mapid').setView([49.23, -122.85], 11);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZndhbmcxMjMiLCJhIjoiY2xheWc1ajN6MHpiZTN1cXU2Y2h0bWNmcCJ9.Pl6JhIepF3ma9Ma1iwOh3w',
      {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(this.map);

    this.createMarkers();
  }

  createMarkers(): void {
    // console.log(this.locations);
    // type ObjectKey = keyof typeof this.locations;

    (Object.keys(this.locations) as (keyof typeof this.locations)[]).forEach((key) => {
      let obj = this.locations[key];
      const data = 'data' as keyof typeof obj;
      console.log(obj[data]);
      L.marker([obj[data]['lon'], obj[data]['lat']])
        .addTo(this.map)
        .bindPopup(
          `<b>${obj[data]['name']}</b><br/>${obj[data]['count']} cases reported.`
        )
        .closePopup();
    });
  }
}

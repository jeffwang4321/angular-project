import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

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
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map:any;

  constructor() { }

  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.23, -122.85], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZndhbmcxMjMiLCJhIjoiY2xheWc1ajN6MHpiZTN1cXU2Y2h0bWNmcCJ9.Pl6JhIepF3ma9Ma1iwOh3w', {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    L.marker([49.2276, -123.0076]).addTo(this.map)
    .bindPopup("<b>Metrotown</b><br/>2 cases reported.").closePopup();

    L.marker([49.1867, -122.8490]).addTo(this.map)
    .bindPopup("<b>SFU Surrey</b><br/>3 cases reported.").closePopup();

  }

}

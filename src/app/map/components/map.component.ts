import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';

declare var ol: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map: Map;
  public mapOptions: MapOptions;

  constructor() {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  public onMapReady(map: Map): void {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions(): void {
    this.mapOptions = {
      center: latLng(45.764043, 4.835659),
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }

  private addSampleMarker(): void {
    const marker = new Marker([45.764043, 4.835659]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );
    marker.addTo(this.map);
    const marker2 = new Marker([45.764043, 4.935659]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );
    marker2.addTo(this.map);
  }
}

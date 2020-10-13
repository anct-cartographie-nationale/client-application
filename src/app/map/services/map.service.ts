import { Injectable } from '@angular/core';
import { icon, Marker, Map } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private markersList = {};
  constructor() {}

  public addMarker(map: Map, lat: number, lon: number, id: number): Map {
    const marker = new Marker([lat, lon]).setIcon(
      icon({
        iconSize: [35, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );

    marker.bindTooltip('<p>Hello <br/>World !</p>'); //TODO: replace with real data
    marker.addTo(map);
    this.markersList[id] = marker;
    return map;
  }

  public toogleToolTip(id: number): void {
    this.getMarker(id).toggleTooltip();
  }

  public setToolTip(id: number): void {
    this.getMarker(id).bindTooltip('<p>Hello <br/>World 2!</p>');
  }

  public getMarker(id: number): Marker {
    return this.markersList[id];
  }
}

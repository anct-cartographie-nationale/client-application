import { Injectable } from '@angular/core';
import { icon, Marker, Map } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private markersList = {};
  constructor() {}

  public createMarker(lat: number, lon: number, id: number, tooltip?: string): Marker {
    const marker = new Marker([lat, lon]).setIcon(
      icon({
        iconSize: [35, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );

    if (tooltip) {
      marker.bindTooltip(tooltip);
    }
    this.markersList[id] = marker;
    return marker;
  }

  /**
   * Toogle a tooltip
   * @param id marker id
   */
  public toogleToolTip(id: number): void {
    this.getMarker(id).toggleTooltip();
  }

  /**
   * Set a tooltip
   * @param id markerId
   * @param html html to display
   */
  public setToolTip(id: number, html: string): void {
    this.getMarker(id).bindTooltip(html);
  }

  /**
   * Get marker by id
   */
  public getMarker(id: number): Marker {
    return this.markersList[id] ? this.markersList[id] : null;
  }
}

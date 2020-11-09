import { Injectable } from '@angular/core';
import { divIcon } from 'leaflet';
import { icon, Marker, Map } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private static markersList = {};
  constructor() {}

  public createMarker(lat: number, lon: number, id: number, tooltip?: string): Marker {
    const markerIcon = divIcon({
      className: null,
      html: '<svg width="40" height="46"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
      iconSize: [35, 41],
      iconAnchor: [13, 41],
    });
    const marker = new Marker([lat, lon], { icon: markerIcon });

    if (tooltip) {
      marker.bindTooltip(tooltip, {
        opacity: 1,
        direction: 'top',
      });
    }
    MapService.markersList[id] = marker;
    return marker;
  }

  /**
   * Toogle a tooltip
   * @param id marker id
   */
  public toogleToolTip(id: number): void {
    if (id) {
      this.getMarker(id).toggleTooltip();
    }
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
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setSelectedMarker(id: number): void {
    if (id) {
      const markerIcon = divIcon({
        className: null,
        html: '<svg width="40" height="46"><use xlink:href="assets/ico/sprite.svg#map-marker-locate"></use></svg>',
        iconSize: [35, 41],
        iconAnchor: [13, 41],
      });
      this.getMarker(id).setIcon(markerIcon);
    }
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setDefaultMarker(id: number): void {
    if (id) {
      const markerIcon = divIcon({
        className: null,
        html: '<svg width="40" height="46"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
        iconSize: [35, 41],
        iconAnchor: [13, 41],
      });
      this.getMarker(id).setIcon(markerIcon);
    }
  }

  /**
   * Get marker by id
   */
  public getMarker(id: number): Marker {
    return MapService.markersList[id] ? MapService.markersList[id] : null;
  }
}

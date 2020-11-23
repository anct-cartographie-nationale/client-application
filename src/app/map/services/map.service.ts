import { Injectable } from '@angular/core';
import { DivIcon, divIcon, Map } from 'leaflet';
import { Marker } from 'leaflet';
import { MarkerType } from '../components/markerType.enum';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private static markersList = {};
  public markerIconHover = divIcon({
    className: null,
    html: '<svg width="40" height="46"><use xlink:href="assets/ico/sprite.svg#map-marker-locate"></use></svg>',
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -46],
  });
  public markerIcon = divIcon({
    className: null,
    html: '<svg width="40" height="46"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -46],
  });
  public markerIconMdm = divIcon({
    className: null,
    html: '<svg width="19" height="24"><use xlink:href="assets/ico/sprite.svg#mdm"></use></svg>',
    iconSize: [19, 24],
    iconAnchor: [9, 0],
  });
  public markerIconMdmHover = divIcon({
    className: null,
    html: '<svg width="19" height="24"><use xlink:href="assets/ico/sprite.svg#mdm-hover"></use></svg>',
    iconSize: [19, 24],
    iconAnchor: [9, 0],
  });
  constructor() {}

  public createMarker(lat: number, lon: number, markerType: MarkerType, id?: number, tooltip?: string): Marker {
    const marker = new Marker([lat, lon], {
      icon: this.getMarkerIcon(markerType),
      attribution: this.getLayerAttributton(markerType),
    });
    marker.on('mouseclick', (evt) => {
      evt.target.openPopup();
    });

    if (tooltip) {
      marker.bindPopup(tooltip, {
        autoPan: false,
      });
    }

    if (id) {
      MapService.markersList[id] = marker;
    }
    return this.bindMouseEventOnMarker(marker, this.getMarkerIcon(markerType), this.getMarkerIconHover(markerType));
  }

  private getLayerAttributton(markerType: MarkerType): string {
    if (markerType === MarkerType.mdm) {
      return 'mdm';
    } else {
      return 'structure';
    }
  }

  private getMarkerIcon(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.mdm) {
      return this.markerIconMdm;
    } else {
      return this.markerIcon;
    }
  }

  private getMarkerIconHover(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.mdm) {
      return this.markerIconMdmHover;
    } else {
      return this.markerIconHover;
    }
  }

  private bindMouseEventOnMarker(marker: Marker, regularIcon: DivIcon, hoverIcon: DivIcon): Marker {
    marker.on('mouseover', (e) => {
      if (marker.getIcon() === regularIcon) {
        marker.setIcon(hoverIcon);
      }
    });

    marker.on('mouseout', (e) => {
      marker.setIcon(regularIcon);
    });
    return marker;
  }

  /**
   * Toogle a tooltip
   * @param id marker id
   */
  public toogleToolTip(id: number): void {
    if (id) {
      this.getMarker(id).togglePopup();
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
      this.getMarker(id).setIcon(this.markerIconHover);
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

  public cleanMap(map: Map): Map {
    MapService.markersList = {};
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof Marker && layer.options.attribution !== 'mdm') {
          map.removeLayer(layer);
        }
      });
    }
    return map;
  }
}

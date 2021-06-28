import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DivIcon, divIcon, Map } from 'leaflet';
import { Marker } from 'leaflet';
import { Observable } from 'rxjs';
import { MarkerType } from '../components/markerType.enum';
import { AddressGeometry } from '../models/addressGeometry.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private static markersList = {};
  private isMarkerActive = false;
  public markerIconActive = divIcon({
    className: null,
    html: '<svg width="40" height="46" fill="#A00000"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -46],
  });
  public markerIconAddedToList = divIcon({
    className: null,
    html:
      '<svg width="40" height="46" fill="#47C562" stroke="#fff" stroke-width="2"><use xlink:href="assets/ico/sprite.svg#map-marker-added"></use></svg>',
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -46],
  });
  public markerIcon = divIcon({
    className: null,
    html:
      '<svg width="40" height="46" fill="#348899" stroke="#fff" stroke-width="2"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -46],
  });
  public markerIconMdm = divIcon({
    className: null,
    html:
      '<svg width="19" height="24" fill="#D4C4A9" class="mdm"><use xlink:href="assets/ico/sprite.svg#mdm"></use></svg>',
    iconSize: [19, 24],
    iconAnchor: [9, 0],
  });
  constructor(private http: HttpClient) {}

  public createMarker(lat: number, lon: number, markerType: MarkerType, id?: string, tooltip?: string): Marker {
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
    return marker;
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

  /**
   * @param id marker id
   */
  public setActiveMarker(id: string): void {
    this.getMarker(id).setIcon(this.markerIconActive);
  }

  public setAddedToListMarker(id: string): void {
    this.getMarker(id).setIcon(this.markerIconAddedToList);
  }

  public setUnactiveMarker(id: string): void {
    // To skip mouseleave when user emit click on structure list
    if (!this.isMarkerActive) {
      this.getMarker(id).setIcon(this.getMarkerIcon(MarkerType.structure));
    }
    this.isMarkerActive = false;
  }

  /**
   * Set a tooltip
   * @param id markerId
   * @param html html to display
   */
  public setToolTip(id: string, html: string): void {
    this.getMarker(id).bindTooltip(html);
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setSelectedMarker(id: string): void {
    if (id) {
      this.getMarker(id).setIcon(this.markerIconActive);
      this.isMarkerActive = true;
    }
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setDefaultMarker(id: string): void {
    if (id) {
      const markerIcon = divIcon({
        className: null,
        html:
          '<svg width="40" height="46" fill="#348899" stroke="#fff" stroke-width="2"><use xlink:href="assets/ico/sprite.svg#map-marker"></use></svg>',
        iconSize: [35, 41],
        iconAnchor: [13, 41],
      });
      this.getMarker(id).setIcon(markerIcon);
    }
  }

  /**
   * Get marker by id
   */
  public getMarker(id: string): Marker {
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

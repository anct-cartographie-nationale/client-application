import { Injectable } from '@angular/core';
import { DivIcon, divIcon, Map, Marker } from 'leaflet';
import { MarkerType } from '../components/markerType.enum';
import {
  markerIcon,
  markerIconActive,
  markerIconAddedToList,
  markerIconFranceService,
  markerIconFranceServiceActive,
  markerIconFranceServiceAddedToList,
  markerIconFranceServiceHover,
  markerIconHover,
  markerIconMdm,
  markerIconMdmActive,
} from './marker';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private static markersList = {};
  private isMarkerActive = false;

  public createMarker(lat: number, lon: number, markerType: MarkerType, id?: string, tooltip?: string): Marker {
    const marker = new Marker([lat, lon], {
      icon: this.getMarkerIcon(markerType),
      attribution: this.getLayerAttributton(markerType),
    });
    marker.on('mouseclick', (evt) => {
      evt.target.openPopup();
    });

    // handle icon change when select marker
    marker.on('click', (evt) => {
      evt.target.setIcon(this.getActiveMarkerIcon(markerType));
    });

    if (tooltip) {
      marker.bindPopup(tooltip);

      // handle icon change when unselect
      marker.getPopup().on('remove', (evt) => {
        marker.setIcon(this.getMarkerIcon(markerType));
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

  // Note: Marke IconFranceService has been removed temporarly on order to rework on buisness needs.
  // This comment is applied for the next 4 methods
  private getMarkerIcon(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.mdm) {
      return markerIconMdm;
    } else if (markerType === MarkerType.conseillerFrance) {
      // return markerIconFranceService;
      return markerIcon;
    } else {
      return markerIcon;
    }
  }

  private getActiveMarkerIcon(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.mdm) {
      return markerIconMdmActive;
    } else if (markerType === MarkerType.conseillerFrance) {
      // return markerIconFranceServiceActive;
      return markerIconActive;
    } else {
      return markerIconActive;
    }
  }

  private getAddedToListMarkerIcon(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.conseillerFrance) {
      // return markerIconFranceServiceAddedToList;
      return markerIconAddedToList;
    } else {
      return markerIconAddedToList;
    }
  }

  private getHoverMarkerIcon(markerType: MarkerType): DivIcon {
    if (markerType === MarkerType.conseillerFrance) {
      // return markerIconFranceServiceHover;
      return markerIconHover;
    } else {
      return markerIconHover;
    }
  }

  /**
   * @param id marker id
   */
  public setActiveMarker(id: string, type: MarkerType = MarkerType.structure): void {
    this.getMarker(id).setIcon(this.getHoverMarkerIcon(type));
  }

  public setAddedToListMarker(id: string, type: MarkerType = MarkerType.structure): void {
    this.getMarker(id).setIcon(this.getAddedToListMarkerIcon(type));
  }

  public setUnactiveMarker(id: string, type: MarkerType = MarkerType.structure): void {
    // To skip mouseleave when user emit click on structure list
    if (!this.isMarkerActive) {
      this.getMarker(id).setIcon(this.getMarkerIcon(type));
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
  public setSelectedMarker(id: string, type: MarkerType = MarkerType.structure): void {
    if (id) {
      this.getMarker(id).setIcon(this.getActiveMarkerIcon(type));
      this.isMarkerActive = true;
    }
  }

  /**
   * Set a marker as selected by changing icon color
   * @param id markerId
   * @param html html to display
   */
  public setDefaultMarker(id: string, type: MarkerType = MarkerType.structure): void {
    if (id) {
      this.getMarker(id).setIcon(this.getMarkerIcon(type));
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

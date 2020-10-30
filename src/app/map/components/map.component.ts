import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, CRS, TileLayer, LatLngBounds, latLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Structure } from '../../models/structure.model';
import { GeoJson } from '../models/geojson.model';
import { GeojsonService } from '../../services/geojson.service';
import { MapService } from '../services/map.service';
import { LeafletControlLayersChanges } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() public structures: Structure[] = [];
  @Input() public toogleToolTipId: number;
  @Input() public selectedMarkerId: number;
  public map: Map;
  public mapOptions: MapOptions;
  // Init locate options
  public locateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: false,
    icon: 'fa-map-marker',
    clickBehavior: { inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'setView' },
    circlePadding: [5, 5],
  };

  constructor(private mapService: MapService, private geoJsonService: GeojsonService) {
    this.initializeMapOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.structures) {
      this.getStructurePosition();
    }
    // Handle map marker tooltip
    if (changes.toogleToolTipId && changes.toogleToolTipId.currentValue !== changes.toogleToolTipId.previousValue) {
      if (changes.toogleToolTipId.previousValue !== undefined) {
        this.mapService.toogleToolTip(changes.toogleToolTipId.previousValue);
      }
      this.mapService.toogleToolTip(changes.toogleToolTipId.currentValue);
    }
    // Handle map marker selection
    if (changes.selectedMarkerId) {
      if (changes.selectedMarkerId.currentValue === undefined) {
        this.mapService.setDefaultMarker(changes.selectedMarkerId.previousValue);
      } else {
        this.mapService.setSelectedMarker(changes.selectedMarkerId.currentValue);
        this.centerLeafletMapOnMarker(changes.selectedMarkerId.currentValue);
      }
    }
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   */
  private getStructurePosition(): void {
    this.structures.forEach((element: Structure) => {
      this.getCoord(element.voie).subscribe((coord: GeoJson) => {
        this.mapService
          .createMarker(coord.geometry.getLon(), coord.geometry.getLat(), element.id, this.buildToolTip(element))
          .addTo(this.map);
      });
    });
  }

  /**
   * Create tooltip for display
   * @param structure Structure
   */
  private buildToolTip(structure: Structure): string {
    const cssAvailabilityClass = structure.isOpen ? 'available' : 'unavailable';
    return (
      '<h1>' +
      structure.nomDeVotreStructure +
      '</h1>' +
      '<p>' +
      structure.typeDeStructure +
      '</p><div>' +
      '<span class="ico-dot-' +
      cssAvailabilityClass +
      '"></span><span>' +
      structure.openDisplay() +
      '</span></div>'
    );
  }

  /**
   * Get coord with a street reference
   * @param idVoie Street reference
   */
  public getCoord(idVoie: number): Observable<GeoJson> {
    return this.geoJsonService.getAddressByIdVoie(idVoie).pipe(mergeMap((res) => this.geoJsonService.getCoord(res)));
  }

  /**
   * Add marker when map is ready to be showned
   * @param map map
   */
  public onMapReady(map: Map): void {
    this.map = map;
  }

  /**
   * Init map options :
   * - Metropole bounds based on a WMS service hosted by data.grandlyon.com
   * - Map Layer based on open street maps
   */
  private initializeMapOptions(): void {
    // Init WMS service with param from data.grandlyon.com
    const metroMaps = new TileLayer.WMS('https://download.data.grandlyon.com/wms/grandlyon', {
      crs: CRS.EPSG4326,
      transparent: true,
      format: 'image/png',
      attribution: 'Map data © OpenStreetMap contributors',
      version: '1.3.0',
      bounds: new LatLngBounds([45.437, 4.568], [46.03, 5.18]),
    });
    metroMaps.wmsParams = {
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      layers: 'adr_voie_lieu.adrmetropole',
      service: 'WMS',
      request: 'GetMap',
      width: 256,
      height: 256,
    };
    // Init WMS service with param from data.grandlyon.com
    const carteLayer = new TileLayer.WMS('https://openstreetmap.data.grandlyon.com/wms', {
      crs: CRS.EPSG3857,
      transparent: true,
      format: 'image/png',
      attribution: 'Map data © OpenStreetMap contributors',
      version: '1.3.0',
      maxZoom: 20,
    });
    carteLayer.wmsParams = {
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      layers: 'osm_grandlyon',
      service: 'WMS',
      request: 'GetMap',
      width: 256,
      height: 256,
    };
    // Center is set on townhall
    // Zoom is blocked on 11 to prevent people to zoom out from metropole
    this.mapOptions = {
      center: latLng(45.764043, 4.835659),
      maxZoom: 19,
      zoom: 10,
      minZoom: 10,
      layers: [carteLayer, metroMaps],
    };
  }

  /**
   * Toogle all tooltips given in parameters
   */
  public toggleToolTip(ids: Array<number>): void {
    ids.forEach((id) => {
      this.mapService.toogleToolTip(id);
    });
  }

  private centerLeafletMapOnMarker(markerId: number) {
    const marker = this.mapService.getMarker(markerId);
    const latLngs = [marker.getLatLng()];
    const markerBounds = latLngBounds(latLngs);
    this.map.fitBounds(markerBounds);
  }
}

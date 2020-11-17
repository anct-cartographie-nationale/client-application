import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  CRS,
  TileLayer,
  LatLngBounds,
  latLngBounds,
  Marker,
  layerGroup,
  polyline,
} from 'leaflet';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Structure } from '../../models/structure.model';
import { GeoJson } from '../models/geojson.model';
import { GeojsonService } from '../../services/geojson.service';
import { MapService } from '../services/map.service';
import { NgxLeafletLocateComponent } from '@runette/ngx-leaflet-locate';
import * as _ from 'lodash';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() public structures: Structure[] = [];
  @Input() public toogleToolTipId: number;
  @Input() public selectedMarkerId: number;
  @ViewChild(NgxLeafletLocateComponent, { static: false }) locateComponent: NgxLeafletLocateComponent;
  @Output() selectedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();
  private currentStructure: Structure;

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

  // Add listener on the popup button to show details of structure
  @HostListener('document:click', ['$event'])
  public clickout(event): void {
    if (event.target.classList.contains('btnShowDetails')) {
      this.selectedStructure.emit(this.currentStructure);
    }
  }

  constructor(private mapService: MapService, private geoJsonService: GeojsonService) {
    this.initializeMapOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.structures) {
      this.handleStructurePosition(changes.structures.previousValue);
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
  private handleStructurePosition(previousStructuresValue: Structure[]): void {
    // If there is more structure than before, append them
    if (
      previousStructuresValue &&
      previousStructuresValue.length > 0 &&
      previousStructuresValue.length < this.structures.length
    ) {
      this.getStructuresPositions(_.differenceWith(this.structures, previousStructuresValue, _.isEqual));
    } else if (this.structures) {
      this.map = this.mapService.cleanMap(this.map);
      this.getStructuresPositions(this.structures);
    }
  }

  private getStructuresPositions(structureListe: Structure[]): void {
    structureListe.forEach((element: Structure) => {
      this.getCoord(element.voie).subscribe((coord: GeoJson) => {
        this.mapService
          .createMarker(coord.geometry.getLon(), coord.geometry.getLat(), element.id, this.buildToolTip(element))
          .addTo(this.map)
          // store structure before user click on button
          .on('popupopen', () => {
            this.currentStructure = element;
          });
      });
    });
  }

  /**
   * Create tooltip for display
   * @param structure Structure
   */
  private buildToolTip(structure: Structure): string {
    let cssAvailabilityClass = structure.isOpen ? 'available' : null;
    if (cssAvailabilityClass === null) {
      if (structure.openedOn.day) {
        cssAvailabilityClass = 'unavailable';
      } else {
        cssAvailabilityClass = 'unknown';
      }
    }
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
      '</span></div><div class="pop-up"><button type="button" class="btnShowDetails">Voir</button></div>'
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
    // Init mdm
    this.initMDMLayer();
    // Init WMS service with param from data.grandlyon.com
    layerGroup();
    const carteLayer = tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    });
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

  private initMDMLayer(): void {
    this.geoJsonService.getMDMGeoJson().subscribe((res) => {
      res.forEach((mdm) => {
        this.mapService.createMDMMarker(mdm.geometry.getLon(), mdm.geometry.getLat()).addTo(this.map);
      });
    });
  }

  /**
   * Toogle all tooltips given in parameters
   */
  public toggleToolTip(ids: Array<number>): void {
    ids.forEach((id) => {
      this.mapService.toogleToolTip(id);
    });
  }

  private centerLeafletMapOnMarker(markerId: number): void {
    const marker = this.mapService.getMarker(markerId);
    const latLngs = [marker.getLatLng()];
    const markerBounds = latLngBounds(latLngs);
    // paddingTopLeft is used for centering marker because of structure details pane
    this.map.fitBounds(markerBounds, { paddingTopLeft: [300, 0] });
  }
}

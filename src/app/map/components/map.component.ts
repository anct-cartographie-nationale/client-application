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
  geoJSON,
  tileLayer,
  Map,
  CRS,
  TileLayer,
  LatLngBounds,
  latLngBounds,
  layerGroup,
} from 'leaflet';
import { Structure } from '../../models/structure.model';
import { GeojsonService } from '../../services/geojson.service';
import { MapService } from '../services/map.service';
import { NgxLeafletLocateComponent } from '@runette/ngx-leaflet-locate';
import * as _ from 'lodash';
import { GeoJsonProperties } from '../models/geoJsonProperties.model';
import { MarkerType } from './markerType.enum';
import { typeStructureEnum } from '../../shared/enum/typeStructure.enum';
import metropole from '../../../assets/geojson/metropole.json';
import brignais from '../../../assets/geojson/brignais.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() public structures: Structure[] = [];
  @Input() public toogleToolTipId: string;
  @Input() public selectedMarkerId: string;
  @Input() public isMapPhone: boolean;
  @ViewChild(NgxLeafletLocateComponent, { static: false }) locateComponent: NgxLeafletLocateComponent;
  @Output() selectedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() locatationTrigger: EventEmitter<boolean> = new EventEmitter<boolean>();
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
    if (changes.isMapPhone) {
      if (this.isMapPhone) {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
      }
    }
    if (changes.structures) {
      this.handleStructurePosition(changes.structures.previousValue);
    }
    // Handle map marker tooltip
    if (changes.toogleToolTipId && changes.toogleToolTipId.currentValue !== changes.toogleToolTipId.previousValue) {
      if (changes.toogleToolTipId.previousValue !== undefined) {
        this.mapService.setUnactiveMarker(changes.toogleToolTipId.previousValue);
      }
      if (changes.toogleToolTipId.currentValue !== undefined) {
        this.mapService.setActiveMarker(changes.toogleToolTipId.currentValue);
      }
    }
    // Handle map marker selection
    if (changes.selectedMarkerId && this.map) {
      this.map.closePopup();
      if (changes.selectedMarkerId.currentValue === undefined) {
        this.mapService.setDefaultMarker(changes.selectedMarkerId.previousValue);
        this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
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
    structureListe.forEach((structure: Structure) => {
      this.mapService
        .createMarker(
          structure.getLat(),
          structure.getLon(),
          MarkerType.structure,
          structure._id,
          this.buildToolTip(structure)
        )
        .addTo(this.map)
        // store structure before user click on button
        .on('popupopen', () => {
          this.currentStructure = structure;
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
      structure.structureName +
      '</h1>' +
      '<p>' +
      structure.getLabelTypeStructure() +
      '</p><div>' +
      '<span class="ico-dot-' +
      cssAvailabilityClass +
      '"></span><span>' +
      structure.openDisplay() +
      '</span></div><div class="pop-up"><button type="button" class="btnShowDetails">Voir</button></div>'
    );
  }

  private buildMdmPopUp(mdmProperties: GeoJsonProperties): string {
    return `<h1>${mdmProperties.nom}</h1><p>${mdmProperties.adresse}</p>`;
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
      zoom: 12,
      minZoom: 10,
      layers: [carteLayer],
    };
  }

  private initMDMLayer(): void {
    this.geoJsonService.getMDMGeoJson().subscribe((res) => {
      res.forEach((mdm) => {
        this.mapService
          .createMarker(
            mdm.geometry.getLat(),
            mdm.geometry.getLon(),
            MarkerType.mdm,
            null,
            this.buildMdmPopUp(mdm.properties)
          )
          .addTo(this.map);
      });
      this.initBrignaisLayer();
      this.initMetropoleLayer();
    });
  }

  private centerLeafletMapOnMarker(markerId: string): void {
    const marker = this.mapService.getMarker(markerId);
    const latLngs = [marker.getLatLng()];
    const markerBounds = latLngBounds(latLngs);
    // paddingTopLeft is used for centering marker because of structure details pane
    this.map.fitBounds(markerBounds, { paddingTopLeft: [300, 0] });
  }

  private initBrignaisLayer(): void {
    this.map.addLayer(
      geoJSON(
        {
          type: brignais.features[0].geometry.type,
          coordinates: brignais.features[0].geometry.coordinates,
        } as any,
        { style: () => ({ color: '#d50000', fillOpacity: 0 }) }
      )
    );
  }

  private initMetropoleLayer(): void {
    this.map.addLayer(
      geoJSON(
        {
          type: metropole.features[0].geometry.type,
          coordinates: metropole.features[0].geometry.coordinates,
        } as any,
        { style: () => ({ color: '#d50000', fillOpacity: 0 }) }
      )
    );
  }

  public sendLocationEvent(event: any): void {
    this.locatationTrigger.emit(true);
  }
}

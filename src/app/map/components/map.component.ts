import { Component, Input, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, CRS, TileLayer, LatLngBounds } from 'leaflet';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() public toogleToolTipIds: Array<number> = [];
  public map: Map;
  public mapOptions: MapOptions;
  // Init locate options
  public locateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: false,
    locateOptions: {
      enableHighAccuracy: true,
    },
    icon: 'fa-map-marker',
    clickBehavior: { inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'setView' },
  };

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  /**
   * Add marker when map is ready to be showned
   * @param map map
   */
  public onMapReady(map: Map): void {
    this.map = map;
    this.addMarker();
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
    const carteLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: 'Map data © OpenStreetMap contributors',
    });
    // Center is set on townhall
    // Zoom is blocked on 11 to prevent people to zoom out from metropole
    this.mapOptions = {
      center: latLng(45.764043, 4.835659),
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

  private addMarker(): void {
    //TODO: Replace with real data
    this.mapService.createMarker(45.764043, 4.835659, 1, '<p>Hello <br/>World !</p>').addTo(this.map);
    this.mapService.createMarker(45.764043, 4.935659, 2, '<p>Hello <br/>World 2!</p>').addTo(this.map);
    this.mapService.createMarker(45.664043, 4.835659, 3).addTo(this.map);
  }
}

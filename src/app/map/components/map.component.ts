import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, Marker, icon, CRS, TileLayer, LatLngBounds } from 'leaflet';

declare const L: any; // Leaflet
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map: Map;
  public mapOptions: MapOptions;
  public layersControl = {};
  public locateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
      enableHighAccuracy: true,
    },
    icon: 'fa-map-marker',
    clickBehavior: { inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'setView' },
  };

  constructor() {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  public onMapReady(map: Map): void {
    this.map = map;
    this.addSampleMarker();
  }

  public onNewLocation(e: Location): void {
    console.log(e);
  }

  private initializeMapOptions(): void {
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

    const ignMaps = new TileLayer.WMS('https://data.grandlyon.com/api/query/map/ign', {
      crs: CRS.EPSG4326,
      transparent: true,
      format: 'image/png',
      attribution: 'Map data © OpenStreetMap contributors',
      version: '1.1.1',
    });
    ignMaps.wmsParams = {
      format: 'image/png',
      styles: 'normal',
      transparent: true,
      version: '1.1.1',
      layers: 'ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO',
      service: 'WMS',
      request: 'GetMap',
      width: 512,
      height: 512,
    };

    const carteLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © OpenStreetMap contributors',
    });

    this.layersControl = {
      baseLayers: {
        Carte: carteLayer,
        Satellite: ignMaps,
      },
      overlays: {
        'Contours métropole': metroMaps,
      },
    };
    this.mapOptions = {
      center: latLng(45.764043, 4.835659),
      zoom: 12,
      layers: [carteLayer, metroMaps],
    };
  }

  private addSampleMarker(): void {
    const marker = new Marker([45.764043, 4.835659]).setIcon(
      icon({
        iconSize: [35, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );
    marker.addTo(this.map);
    const marker2 = new Marker([45.764043, 4.935659]).setIcon(
      icon({
        iconSize: [35, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/ic_marker.png',
      })
    );
    marker2.addTo(this.map);
    marker.bindTooltip('<p>Hello <br/>World !</p>');
  }
}

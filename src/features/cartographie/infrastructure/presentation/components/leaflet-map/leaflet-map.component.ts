import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import L, { Bounds, LeafletMouseEvent, Map as LeafletMap } from 'leaflet';
import { CenterView, flyTo, initializeMap } from './leaflet-map.presenter';
import { Localisation } from '../../../../../../models';

const DEFAULT_CENTER_LATITUDE: number = 0;

const DEFAULT_CENTER_LONGITUDE: number = 0;

const DEFAULT_ZOOM: number = 0;

const DEFAULT_VIEW: CenterView = {
  coordinates: Localisation({
    latitude: DEFAULT_CENTER_LATITUDE,
    longitude: DEFAULT_CENTER_LONGITUDE
  }),
  zoomLevel: DEFAULT_ZOOM
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html'
})
export class LeafletMapComponent implements OnInit {
  private _centerView: CenterView = DEFAULT_VIEW;

  private _map?: LeafletMap;

  @Output() public readonly mapClick: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  @ViewChild('map', { static: true }) public mapContainer!: ElementRef<HTMLElement>;

  public get map(): LeafletMap | undefined {
    return this._map;
  }

  @Input() public set centerView(centerView: CenterView) {
    this._centerView = centerView;
    this._map && flyTo(this._map, centerView);
  }

  @Input() public set fitBounds(bounds: Bounds | null) {
    this._map &&
      bounds &&
      this._map.fitBounds([
        [bounds.getTopLeft().x, bounds.getTopLeft().y],
        [bounds.getBottomRight().x, bounds.getBottomRight().y]
      ]);
  }

  public ngOnInit(): void {
    this._map = initializeMap(this.mapContainer.nativeElement, this._centerView);
    this._map.on('click', (leafletMouseEvent: LeafletMouseEvent): void => this.mapClick.next(leafletMouseEvent));
  }
}

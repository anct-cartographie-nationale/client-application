/* eslint-disable @angular-eslint/directive-selector */

import { AfterViewInit, Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { BBox } from 'geojson';
import { LatLng, LatLngBounds } from 'leaflet';
import { LeafletMapComponent } from '../../components';

export interface ViewportAndZoom {
  viewport: BBox;
  zoomLevel: number;
}

export interface ViewReset extends ViewportAndZoom {
  center: LatLng;
}

const isZoomOut = (previousZoomLevel: number, currentZoomLevel: number): boolean => previousZoomLevel - currentZoomLevel > 0;

@Directive({
  selector: 'app-leaflet-map[stateChange]'
})
export class LeafletMapStateChangeDirective implements AfterViewInit, OnDestroy {
  private _previousZoomLevel: number = 0;

  @Output() public readonly stateChange: EventEmitter<ViewReset> = new EventEmitter<ViewReset>();

  @Output() public readonly zoomOut: EventEmitter<void> = new EventEmitter<void>();

  public constructor(public readonly mapComponent: LeafletMapComponent) {}

  private bindMoveEnd(): void {
    this.mapComponent.map?.on('moveend', (): void => {
      this.emitStateChange();
    });
  }

  private bindViewReset(): void {
    this.mapComponent.map?.on('viewreset', (): void => {
      this.emitStateChange();
    });
  }

  private bindZoomEnd(): void {
    this.mapComponent.map?.on('zoomend', (): void => {
      this.emitStateChange();
    });
  }

  private emitStateChange(): void {
    if (this.mapComponent.map == null) return;

    const zoomLevel: number = this.mapComponent.map.getZoom();
    this.stateChange.emit({
      center: this.mapComponent.map.getCenter(),
      viewport: this.getViewport(this.mapComponent.map.getBounds()),
      zoomLevel
    });
    this.emitZoomOutIfNeeded(zoomLevel);
    this._previousZoomLevel = zoomLevel;
  }

  private emitZoomOutIfNeeded(currentZoomLevel: number): void {
    if (isZoomOut(this._previousZoomLevel, currentZoomLevel)) {
      this.zoomOut.emit();
    }
  }

  private getViewport(bounds: LatLngBounds): BBox {
    return [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
  }

  private unbindMoveEnd(): void {
    this.mapComponent.map?.off('moveend', (): void => {
      this.emitStateChange();
    });
  }

  private unbindViewReset(): void {
    this.mapComponent.map?.off('viewreset', (): void => {
      this.emitStateChange();
    });
  }

  private unbindZoomEnd(): void {
    this.mapComponent.map?.off('zoomend', (): void => {
      this.emitStateChange();
    });
  }

  public ngAfterViewInit(): void {
    this.bindViewReset();
    this.bindZoomEnd();
    this.bindMoveEnd();
  }

  public ngOnDestroy(): void {
    this.unbindViewReset();
    this.unbindZoomEnd();
    this.unbindMoveEnd();
  }
}

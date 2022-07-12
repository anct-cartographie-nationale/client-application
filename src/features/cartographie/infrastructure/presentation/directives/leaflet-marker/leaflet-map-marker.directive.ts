/* eslint-disable @angular-eslint/directive-selector */

import { Directive, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { DivIcon, Icon, LeafletEvent, marker, Marker, MarkerOptions, Popup, Tooltip } from 'leaflet';
import { LeafletMapComponent } from '../../components';
import { CanHavePopup, CanHavePopupDirective, CanHaveTooltip, CanHaveTooltipDirective } from '../_abstract';
import { MarkerHighlight, MarkerProperties, MARKERS_TOKEN, MarkersConfiguration } from '../../configuration/marker';

interface MarkerOverlay {
  popup: Popup | undefined;
  tooltip: Tooltip | undefined;
}

export interface MarkerEvent<T> {
  eventType: string;
  markerProperties: T;
  markerPosition: {
    latitude: number;
    longitude: number;
  };
}

@Directive({
  providers: [
    { provide: CanHavePopupDirective, useExisting: LeafletMapMarkerDirective },
    { provide: CanHaveTooltipDirective, useExisting: LeafletMapMarkerDirective }
  ],
  selector: 'app-leaflet-map-marker[markerFactoryKey][latitude][longitude]'
})
export class LeafletMapMarkerDirective<TProperty, TIcon extends DivIcon | Icon>
  implements OnChanges, OnDestroy, CanHavePopup<Marker>, CanHaveTooltip<Marker>
{
  private _marker?: Marker;

  @Input() public highlight?: MarkerHighlight;

  @Input() public latitude!: number;

  @Input() public longitude!: number;

  @Output() public readonly markerClick: EventEmitter<MarkerEvent<TProperty>> = new EventEmitter<MarkerEvent<TProperty>>();

  @Output() public readonly markerEnter: EventEmitter<MarkerEvent<TProperty>> = new EventEmitter<MarkerEvent<TProperty>>();

  @Input() public markerFactoryKey: string = '';

  @Output() public readonly markerLeave: EventEmitter<MarkerEvent<TProperty>> = new EventEmitter<MarkerEvent<TProperty>>();

  @Input() public properties!: TProperty;

  public get popupHolder(): Marker | undefined {
    return this._marker;
  }

  public get tooltipHolder(): Marker | undefined {
    return this._marker;
  }

  public constructor(
    private readonly _mapComponent: LeafletMapComponent,
    @Inject(MARKERS_TOKEN) private readonly markersConfigurations: MarkersConfiguration<TProperty, TIcon>
  ) {}

  private bindClick(): void {
    this._marker?.on('click', (leafletEvent: LeafletEvent): void => {
      this.markerClick.emit({
        eventType: leafletEvent.type,
        markerPosition: {
          latitude: this.latitude,
          longitude: this.longitude
        },
        markerProperties: this.properties
      });
    });
  }

  private bindMarkerEvents(): void {
    this.bindMouseover();
    this.bindMouseout();
    this.bindClick();
  }

  private bindMouseout(): void {
    this._marker?.on('mouseout', (leafletEvent: LeafletEvent): void => {
      this.markerLeave.emit({
        eventType: leafletEvent.type,
        markerPosition: {
          latitude: this.latitude,
          longitude: this.longitude
        },
        markerProperties: this.properties
      });
    });
  }

  private bindMouseover(): void {
    this._marker?.on('mouseover', (leafletEvent: LeafletEvent): void => {
      this.markerEnter.emit({
        eventType: leafletEvent.type,
        markerPosition: {
          latitude: this.latitude,
          longitude: this.longitude
        },
        markerProperties: this.properties
      });
    });
  }

  private getMarkerOverlay(): MarkerOverlay {
    return {
      popup: this._marker?.getPopup(),
      tooltip: this._marker?.getTooltip()
    };
  }

  private markerOptions(): MarkerOptions {
    return {
      icon: this.markersConfigurations[this.markerFactoryKey](this.toMarkerProperties())
    };
  }

  private setMarkerOverlay({ popup, tooltip }: MarkerOverlay): void {
    tooltip != null && this._marker?.bindTooltip(tooltip);
    popup != null && this._marker?.bindPopup(popup);
  }

  private toMarkerProperties(): MarkerProperties<TProperty> {
    return {
      ...this.properties,
      highlight: this.highlight,
      markerType: this.markerFactoryKey,
      zIndexOffset: 0
    };
  }

  private unbindClick(): void {
    this._marker?.off('click');
  }

  private unbindMarkerEvents(): void {
    this.unbindClick();
    this.unbindMouseout();
    this.unbindMouseover();
  }

  private unbindMouseout(): void {
    this._marker?.off('mouseout');
  }

  private unbindMouseover(): void {
    this._marker?.off('mouseover');
  }

  public ngOnChanges(): void {
    if (this._mapComponent.map == null) return;

    const previousMarkerOverlay: MarkerOverlay = this.getMarkerOverlay();
    this._marker?.removeFrom(this._mapComponent.map);
    this._marker = marker([this.latitude, this.longitude], this.markerOptions()).addTo(this._mapComponent.map);
    this.setMarkerOverlay(previousMarkerOverlay);
    this.bindMarkerEvents();
  }

  public ngOnDestroy(): void {
    this._mapComponent.map != null && this._marker?.removeFrom(this._mapComponent.map);
    this.unbindMarkerEvents();
  }
}

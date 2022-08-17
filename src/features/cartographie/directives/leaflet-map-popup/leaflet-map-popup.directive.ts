/* eslint-disable @angular-eslint/directive-selector */

import { Directive, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { Layer, popup, Popup, PopupOptions } from 'leaflet';
import { LeafletMapComponent } from '../../components';
import { CanHavePopupDirective } from '../_abstract';

type Position = [number, number];

const SCROLL_DELAY_IN_MILLISECONDS: number = 100;

@Directive({
  selector: 'app-leaflet-map-popup'
})
export class LeafletMapPopupDirective implements OnDestroy, OnChanges {
  private _popup?: Popup;

  @Input() public closeButton: boolean = true;

  @Input() public closeOnClick: boolean = true;

  @Input() public content: HTMLElement | string = '';

  @Input() public isOpen: boolean = false;

  @Input() public latitude?: number;

  @Input() public longitude?: number;

  public constructor(
    private readonly _mapComponent: LeafletMapComponent,
    @Optional() private readonly _canHavePopup: CanHavePopupDirective<Layer> | null
  ) {}

  private getPosition(): Position | null {
    return this.latitude != null && this.longitude != null ? [this.latitude, this.longitude] : null;
  }

  private openOnDisplay(): void {
    if (!this.isOpen) return;

    setTimeout((): void => {
      this._canHavePopup?.popupHolder?.openPopup();
    }, SCROLL_DELAY_IN_MILLISECONDS);
  }

  private popupOptions(): PopupOptions {
    return {
      closeButton: this.closeButton,
      closeOnClick: this.closeOnClick
    };
  }

  public ngOnChanges(): void {
    if (this._mapComponent.map == null) return;

    this._popup = popup().setContent(this.content);
    const position: Position | null = this.getPosition();
    position != null && this._popup.setLatLng(position).openOn(this._mapComponent.map);
    this._canHavePopup?.popupHolder?.bindPopup(this._popup, this.popupOptions());
    this.openOnDisplay();
  }

  public ngOnDestroy(): void {
    this._mapComponent.map != null && this._popup?.removeFrom(this._mapComponent.map);
    this._mapComponent.map?.closePopup(this._popup);
    this._canHavePopup?.popupHolder?.closePopup();
  }
}

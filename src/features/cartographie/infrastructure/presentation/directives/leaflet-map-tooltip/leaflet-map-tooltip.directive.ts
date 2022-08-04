/* eslint-disable @angular-eslint/directive-selector */

import { Directive, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { Layer, tooltip, Tooltip } from 'leaflet';
import { CanHaveTooltipDirective } from '../_abstract';
import { LeafletMapComponent } from '../../components';

@Directive({
  selector: 'app-leaflet-map-tooltip'
})
export class LeafletMapTooltipDirective implements OnDestroy, OnChanges {
  private _tooltip?: Tooltip;

  @Input() public content: HTMLElement | string = '';

  public constructor(
    private readonly _mapComponent: LeafletMapComponent,
    @Optional() private readonly _canHaveTooltip: CanHaveTooltipDirective<Layer> | null
  ) {}

  public ngOnChanges(): void {
    if (this._mapComponent.map == null) return;

    this._tooltip = tooltip().setContent(this.content);
    this._canHaveTooltip?.tooltipHolder?.bindTooltip(this._tooltip, {
      direction: 'auto',
      opacity: 1,
      sticky: true,
      className: 'leaflet-tooltip-own'
    });
  }

  public ngOnDestroy(): void {
    this._mapComponent.map != null && this._tooltip?.removeFrom(this._mapComponent.map);
    this._mapComponent.map?.closeTooltip(this._tooltip);
    this._canHaveTooltip?.tooltipHolder?.closeTooltip();
    this._canHaveTooltip?.tooltipHolder?.unbindTooltip();
  }
}

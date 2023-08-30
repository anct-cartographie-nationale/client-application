import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { RegionPresentation } from '../../../core/presenters';
import { CartographieLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent {
  @Input() regions: RegionPresentation[] = [];
  @Input() public hoverId: string | null = null;

  @Output() showHub: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();
  @Output() showHubInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() showLieux: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    public cartographieLayout: CartographieLayout,
    public readonly route: ActivatedRoute
  ) {}
}

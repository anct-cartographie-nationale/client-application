import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent {
  @Input() regions: RegionPresentation[] = [];
  @Input() public hoverId: string | null = null;

  @Output() showHub: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();
  @Output() showLieux: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public constructor(public readonly route: ActivatedRoute) {}
}

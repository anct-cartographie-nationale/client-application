import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartementPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent {
  @Input() regions: DepartementPresentation[] = [];
  @Input() public hoverId: string | null = null;

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public constructor(public readonly route: ActivatedRoute) {}
}

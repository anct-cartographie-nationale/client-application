import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public labelsNationaux?: LabelNational[];
  @Input() public labelsAutres?: string[];

  @Output() public showLabel: EventEmitter<LabelNational> = new EventEmitter<LabelNational>();

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}

import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { labelToDisplayMap } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public labelsNationaux: LabelNational[] | undefined;

  @Input() public labelsAutres: string[] | undefined;

  @Output() public showLabel: EventEmitter<LabelNational> = new EventEmitter<LabelNational>();

  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  public toLabelNom(label: LabelNational): string | undefined {
    return labelToDisplayMap.get(label)?.nom;
  }
}

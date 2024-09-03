import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DispositifProgrammeNational, FormationLabel } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { labelToDisplayMap } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public dispositifProgrammesNationaux: DispositifProgrammeNational[] | undefined;

  @Input() public formationsLabels: FormationLabel[] | undefined;

  @Input() public autresFormationsLabels: string[] | undefined;

  @Output() public showLabel: EventEmitter<DispositifProgrammeNational> = new EventEmitter<DispositifProgrammeNational>();

  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  public toLabelNom(label: DispositifProgrammeNational): string | undefined {
    return labelToDisplayMap.get(label)?.nom;
  }
}

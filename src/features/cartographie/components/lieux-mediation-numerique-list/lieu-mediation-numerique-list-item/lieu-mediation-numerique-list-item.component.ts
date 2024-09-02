import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatomoTracker } from 'ngx-matomo';
import { DispositifProgrammeNational, Frais } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../../root';
import { labelToDisplayMap, LieuMediationNumeriqueListItemPresentation } from '../../../presenters';
import { environment } from 'projects/client-application/src/environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mediation-numerique-list-item',
  templateUrl: './lieu-mediation-numerique-list-item.component.html'
})
export class LieuMediationNumeriqueListItemComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  @Output() public showLabel: EventEmitter<DispositifProgrammeNational> = new EventEmitter<DispositifProgrammeNational>();

  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();

  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public readonly payant: Frais.Payant = Frais.Payant;

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    public readonly route: ActivatedRoute,
    @Optional() private readonly _matomoTracker?: MatomoTracker
  ) {}

  public dateIsValide(dateMaj: Date): boolean {
    return dateMaj > new Date('1970-01-01');
  }

  public showDetails(lieu: LieuMediationNumeriqueListItemPresentation): void {
    if (environment.production) {
      this._matomoTracker?.trackEvent('Fiches', 'Début', `Ouverture de fiches - ${lieu.id}`);
    }
  }

  public toLabelNom(dispositifProgrammeNational: DispositifProgrammeNational): string | undefined {
    return labelToDisplayMap.get(dispositifProgrammeNational)?.nom;
  }
}

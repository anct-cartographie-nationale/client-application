import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  LabelsNationauxPresentation,
  RegionPresentation,
  TypologiePresentation,
  WithLieuxCount
} from '@features/core/presenters';
import { DispositifProgrammeNational, LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chiffres-cle',
  templateUrl: './chiffres-cle.component.html'
})
export class ChiffresCleComponent {
  @Input() public regions: WithLieuxCount<RegionPresentation[]> | null = { payload: [], lieuxCount: 0 };
  @Input() public lieuxMediationNumeriqueTotal: LieuMediationNumerique[] = [];
  @Input() public typologies: TypologiePresentation[] = [];
  @Input() public labels: LabelsNationauxPresentation[] = [];

  public labelMap: Map<string, string> = new Map<string, string>([
    [DispositifProgrammeNational.ConseillersNumeriques, 'Lieux accueillant des conseillers numérique'],
    [DispositifProgrammeNational.FranceServices, 'Points accueil numérique labellisés France services'],
    [DispositifProgrammeNational.AidantsConnect, 'Points accueil habilités Aidants Connect'],
    ['QPV', 'Lieux situés en quartier prioritaire de la ville (QPV)'],
    ['ZRR', 'Lieux situés en zone de revitalisation rurale (ZRR)']
  ]);

  public getTerritoiresPrioritaireCount(): number {
    return this.labels
      .filter((label: LabelsNationauxPresentation) => label.nom === 'QPV' || label.nom === 'ZRR')
      .reduce((acc, territoirePrioritaire) => acc + (territoirePrioritaire.lieuxCount || 0), 0);
  }

  public getPublicProperties(): TypologiePresentation | undefined {
    return this.typologies.find((typologie: TypologiePresentation) => typologie.nom === 'Public');
  }

  public sortByLieuxCount(regions: RegionPresentation[] = []): RegionPresentation[] {
    return regions.sort(
      (regionA: RegionPresentation, regionB: RegionPresentation): number =>
        (regionB.lieuxCount ?? 0) - (regionA.lieuxCount ?? 0)
    );
  }
}

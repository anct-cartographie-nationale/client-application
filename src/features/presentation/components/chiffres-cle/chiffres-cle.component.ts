import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LabelsNationauxPresentation, RegionPresentation, TypologiePresentation } from '@features/core/presenters';
import { LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chiffres-cle',
  templateUrl: './chiffres-cle.component.html'
})
export class ChiffresCleComponent {
  @Input() public regions: RegionPresentation[] = [];
  @Input() public lieuxMediationNumeriqueTotal: LieuMediationNumerique[] = [];
  @Input() public typologies: TypologiePresentation[] = [];
  @Input() public labels: LabelsNationauxPresentation[] = [];

  public labelMap: Map<string, string> = new Map<string, string>([
    ['CNFS', 'Lieux accueillant des conseillers numérique'],
    ['France Services', 'Points accueil numérique labellisés France services'],
    ['Aidants Connect', 'Points accueil habilités Aidants Connect'],
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
}

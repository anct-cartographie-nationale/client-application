import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Courriel, Url } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../../core/presenters';
import { SourcePresentation, toCourrielsWithCC } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-pratiques',
  templateUrl: './informations-pratiques.component.html'
})
export class InformationsPratiquesComponent {
  @Input() public nom!: string;
  @Input() public adresse!: string;
  @Input() public itinerence?: boolean = false;
  @Input() public fraisACharge?: string[] = [];
  @Input() public ficheAccesLibre: Url | undefined;
  @Input() public courriels: Courriel[] | undefined;
  @Input() public telephone: string | undefined;
  @Input() public distance: number | undefined;
  @Input() public status: OpeningState | undefined;
  @Input() public sources: SourcePresentation[] | undefined;

  public isAidantsConnect(sources?: SourcePresentation[]) {
    return sources?.length === 1 && sources?.map((source: SourcePresentation) => source.label).includes('Aidants Connect');
  }

  public toCourrielsWithCC(courriels?: string[]) {
    return toCourrielsWithCC(courriels);
  }
}

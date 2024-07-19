import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Url } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../../core/presenters';
import { SourcePresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-pratiques',
  templateUrl: './informations-pratiques.component.html'
})
export class InformationsPratiquesComponent {
  @Input() public adresse!: string;
  @Input() public conditionsAcces: string | undefined;
  @Input() public accessibilite: Url | undefined;
  @Input() public courriel: string | undefined;
  @Input() public telephone: string | undefined;
  @Input() public distance: number | undefined;
  @Input() public status: OpeningState | undefined;
  @Input() public sources: SourcePresentation[] | undefined;

  public isAidantsConnect(sources?: SourcePresentation[]) {
    return sources?.map((source: SourcePresentation) => source.label).includes('Aidants Connect');
  }
}

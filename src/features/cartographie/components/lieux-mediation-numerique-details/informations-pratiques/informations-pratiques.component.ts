import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Url } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../../core/presenters';

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

  public prepareMailtoLink(courriels: string): string {
    const courrielList = courriels.split(';');
    let mailtoLink = `mailto:${courrielList[0]}`;

    if (courrielList.length > 1) {
      const ccEmails = courrielList.slice(1).join(',');
      mailtoLink += `?cc=${ccEmails}`;
    }
    return mailtoLink;
  }
}

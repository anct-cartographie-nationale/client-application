import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OpeningStatus } from '../../../core';

type sourcePresentation = {
  nom: string;
  link: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public id: string = '';
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
  @Input() public status?: OpeningStatus;
  @Input() public source?: string = '';

  public sourceRedirectionLink: sourcePresentation[] = [
    {
      nom: 'conseiller-numerique',
      link: 'https://www.conseiller-numerique.gouv.fr'
    },
    {
      nom: 'dora',
      link: 'https://dora.fabrique.social.gouv.fr'
    },
    {
      nom: 'hinaura',
      link: 'https://www.hinaura.fr'
    },
    {
      nom: 'maine-et-loire',
      link: 'https://data.maine-et-loire.fr/explore/dataset/224900019_lieux-de-mediation-numerique-en-maine-et-loire/table/https://data.maine-et-loire.fr/explore/dataset/224900019_lieux-de-mediation-numerique-en-maine-et-loire/table/'
    },
    {
      nom: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-le-hub-les-assembleurs/'
    },
    {
      nom: 'france-services',
      link: 'https://www.data.gouv.fr/fr/datasets/liste-des-structures-labellisees-france-services/'
    }
  ];
}

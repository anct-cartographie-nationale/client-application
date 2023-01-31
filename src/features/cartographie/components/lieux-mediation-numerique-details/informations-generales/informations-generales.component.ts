import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OpeningState } from '../../../../core';

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
  @Input() public status?: OpeningState;
  @Input() public source?: string = '';

  public sourceRedirectionLink: sourcePresentation[] = [
    {
      nom: 'conseiller-numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique/'
    },
    {
      nom: 'dora',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numeriques-en-france-disponibles-dans-le-referentiel-de-loffre-dinsertion-publie-par-data-inclusion/'
    },
    {
      nom: 'hinaura',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-auvergne-rhone-alpes-fournis-par-le-hub-hinaura-1/'
    },
    {
      nom: 'maine-et-loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-le-departement-du-maine-et-loire/'
    },
    {
      nom: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-le-hub-les-assembleurs/'
    },
    {
      nom: 'france-services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-le-label-france-services/'
    }
  ];
}

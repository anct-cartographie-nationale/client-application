import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

type IntegrateursPresentation = {
  titre: string;
  sousTitre: string;
  text: string;
  link: string;
  linkTitre: string;
  bgImage: string;
  bgPrimary: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-integrateurs',
  templateUrl: './integrateurs.component.html',
  styleUrls: ['../../pages/presentation/presentation.page.scss']
})
export class IntegrateursComponent {
  public integrateursPresentation: IntegrateursPresentation[] = [
    {
      titre: 'OUTIL',
      sousTitre: 'Cartographie Nationale',
      text: `Nous sommes notre premier intégrateur.`,
      link: 'https://cartographie.societenumerique.gouv.fr/cartographie',
      linkTitre: 'Consulter notre cartographie',
      bgImage: 'france-et-outremer-map.svg',
      bgPrimary: 'bg-carto-nationale-cnfs'
    },
    {
      titre: 'HUB',
      sousTitre: 'Mednum Antilles',
      text: `Cartographie des lieux d'inclusion numérique aux Antilles.`,
      link: 'http://anct-carto-client-feature-hub-antilles-default-view.s3-website.eu-west-3.amazonaws.com/orientation',
      linkTitre: 'Cartographie de la Mednum Antilles',
      bgImage: 'antille-guyane-map.svg',
      bgPrimary: 'bg-mednum-antilles'
    },
    {
      titre: 'LABEL',
      sousTitre: 'Conseiller Numérique',
      text: `Cartographie recensant uniquement les conseillers numériques et leurs lieux de permanence.`,
      link: 'https://www.conseiller-numerique.gouv.fr/carte',
      linkTitre: 'Cartographie de Conseiller Numérique',
      bgImage: 'france-et-outremer-map.svg',
      bgPrimary: 'bg-carto-nationale-cnfs'
    },
    {
      titre: 'HUB',
      sousTitre: 'Numi',
      text: `Cartographie des lieux d'inclusion numérique en Normandie.`,
      link: 'https://ledome.info/ressources/numi/',
      linkTitre: 'Cartographie de Numi',
      bgImage: 'normandie-map.svg',
      bgPrimary: 'bg-numi'
    }
  ];
}

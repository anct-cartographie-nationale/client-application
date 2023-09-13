import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

type IntegrateursPresentation = {
  titre: string;
  sousTitre: string;
  text: string;
  link: string;
  linkTitre: string;
  bgImage: string;
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
      text: `La cartographie est intégrée sur un site dédié, dans lequel l'ensemble du territoire et des acteurs sont
      représentés`,
      link: 'https://cartographie.societenumerique.gouv.fr/cartographie',
      linkTitre: 'Consulter la cartographie',
      bgImage: 'carto-nationale-map.svg'
    },
    {
      titre: 'HUB',
      sousTitre: 'Mednum Antilles',
      text: `Mednum Antilles est le HUB de l'inclusion numérique aux Antilles`,
      link: 'http://anct-carto-client-feature-hub-antilles-default-view.s3-website.eu-west-3.amazonaws.com/orientation',
      linkTitre: 'Consulter leur cartographie',
      bgImage: 'carto-nationale-map.svg'
    },
    {
      titre: 'HUB',
      sousTitre: 'Numi',
      text: `Numi est le HUB de l'inclusion numérique en Normandie`,
      link: 'https://ledome.info/ressources/numi/',
      linkTitre: 'Consulter leur cartographie',
      bgImage: 'carto-nationale-map.svg'
    },
    {
      titre: 'LABEL',
      sousTitre: 'CNFS',
      text: `Conseiller Numérique France Service à intégré la cartographie sur son site web`,
      link: 'https://www.conseiller-numerique.gouv.fr/carte',
      linkTitre: 'Consulter leur cartographie',
      bgImage: 'cnfs-map.svg'
    }
  ];
}

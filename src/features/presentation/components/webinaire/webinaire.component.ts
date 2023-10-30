import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

type WebinairePresentation = {
  titre: string;
  duration: string;
  text: string;
  image: string;
  inscription_link: string;
  replay?: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-webinaire',
  templateUrl: './webinaire.component.html'
})
export class WebinaireComponent {
  public webinairePresentation: WebinairePresentation[] = [
    {
      titre: 'Apprenez à orienter vos bénéficiaires grâce à la cartographie',
      duration: '45 min - 1 fois par mois',
      text: `Consacré à l'utilisation du parcours d'orientation et la navigation sur la carte. `,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shrfwVic55IqzxKfG?mtm_campaign=fromwebsitecarto',
      image: 'webinaire-orientation.svg',
      replay: 'https://www.youtube.com/watch?v=bn1jipMvzoA'
    },
    {
      titre: 'Mettez à jour vos données sur la cartographie',
      duration: '45 min - 1 fois par mois',
      text: `Consacré à l'utilisation des outils de mise à jour de données, en particulier l'outil DORA.`,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shrX7zSTk8pOtoKik?mtm_campaign=fromwebsitecarto',
      image: 'webinaire-mise-a-jour.svg',
      replay: 'https://www.youtube.com/watch?v=YJjsMjVPluY'
    },
    {
      titre: 'Permanence visio : posez vos questions et nous y répondons',
      duration: '45 min - 1 fois par mois',
      text: `Nous sommes à votre écoute pour répondre à vos questions et vos besoins spécifiques.`,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shriflITshG3ba1RC?mtm_campaign=fromwebsitecarto',
      image: 'webinaire-portes-ouvertes.svg'
    }
  ];
}

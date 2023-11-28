import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

type WebinairePresentation = {
  titre: string;
  duration: string;
  text: string;
  image: string;
  inscription_link: string;
  inscription_text: string;
  replay_link?: string;
  replay_text?: string;
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
      inscription_text: 'Webinaire orientation',
      image: 'webinaire-orientation.svg',
      replay_link: 'https://www.youtube.com/watch?v=bn1jipMvzoA',
      replay_text: 'Replay orientation'
    },
    {
      titre: 'Mettez à jour vos données sur la cartographie',
      duration: '45 min - 1 fois par mois',
      text: `Consacré à l'utilisation des outils de mise à jour de données, en particulier l'outil DORA.`,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shrX7zSTk8pOtoKik?mtm_campaign=fromwebsitecarto',
      inscription_text: 'Webinaire données',
      image: 'webinaire-mise-a-jour.svg',
      replay_link: 'https://www.youtube.com/watch?v=YJjsMjVPluY',
      replay_text: 'Replay données'
    }
  ];
}

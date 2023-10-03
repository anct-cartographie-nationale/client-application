import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

type WebinairePresentation = {
  titre: string;
  duration: string;
  text: string;
  image: string;
  inscription_link: string;
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
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shrfwVic55IqzxKfG',
      image: 'webinaire-orientation.svg'
    },
    {
      titre: 'Mettez à jour vos données sur la cartographie',
      duration: '45 min - 1 fois par mois',
      text: `Consacré à l'utilisation des outils de mise à jour de données, en particulier l'outil DORA.`,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shrX7zSTk8pOtoKik',
      image: 'webinaire-mise-a-jour.svg'
    },
    {
      titre: 'Permanence visio : posez vos questions et nous y répondons',
      duration: '45 min - 1 fois par mois',
      text: `Nous sommes à votre écoute pour répondre à vos questions et vos besoins spécifiques.`,
      inscription_link: 'https://airtable.com/app2MF0d9XxkCwv0p/shriflITshG3ba1RC',
      image: 'webinaire-portes-ouvertes.svg'
    }
  ];
}

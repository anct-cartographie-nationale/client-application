import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

type WebinairePresentation = {
  titre: string;
  text: string;
  image: string;
  link: string;
  link_text: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-webinaire',
  templateUrl: './webinaire.component.html'
})
export class WebinaireComponent {
  public webinairePresentation: WebinairePresentation[] = [
    {
      titre: 'Apparaître ou modifier ses données sur la cartographie nationale',
      text: 'Pas-à-pas pour vous guider dans la mise à jour de vos données.',
      link: 'https://lesbases.anct.gouv.fr/ressources/comment-apparaitre-ou-modifier-vos-donnees-sur-la-cartographie-nationale',
      link_text: 'Voir la ressource sur les bases',
      image: 'mise-a-jour-donnees.svg'
    },
    {
      titre: 'Intégrer la cartographie sur son site web',
      text: "Pas-à-pas pour intégrer la cartographie nationale sur votre site web, sans besoin d'avoir des compétences de programmation.",
      link: 'https://lesbases.anct.gouv.fr/ressources/integrer-la-cartographie-sur-mon-site-web',
      link_text: 'Voir la ressource sur les bases',
      image: 'integrer-cartographie.svg'
    },
    {
      titre: "Évolution du standard national des lieux d'inclusion numérique",
      text: "Descriptif des évolutions du standard national des lieux d'inclusion numérique (version 1.0.1)",
      link: 'https://lesbases.anct.gouv.fr/ressources/evolution-du-standard-national ',
      link_text: 'Voir la ressource sur les bases',
      image: 'standard-donnees.svg'
    }
  ];
}

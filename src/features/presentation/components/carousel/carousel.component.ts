import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

const fadeIn = animation([style({ opacity: 0 }), animate('{{time}}', style({ opacity: 1 }))]);

const fadeOut = animation([animate('{{time}}', style({ opacity: 0 }))]);

type SlidePresentations = {
  titre: string;
  text: string;
  imageUrl: string;
  imageDescription: string;
  slideNumber: number;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(fadeIn, { params: { time: '1300ms' } })]),
      transition('* => void', [useAnimation(fadeOut, { params: { time: '1300ms' } })])
    ])
  ]
})
export class CarouselComponent {
  public currentSlide: number = 0;

  public slidePresentations: SlidePresentations[] = [
    {
      titre: "L'orientation",
      text: `En 4 étapes, vous pouvez afficher les structures correspondant exactement aux besoins d'un bénéficiaire, dans une zone
    géographique limitée ouvertes lorsqu'il est disponible.`,
      imageUrl: '/assets/img/presentation/svg-orientation.svg',
      imageDescription: '',
      slideNumber: 0
    },
    {
      titre: 'La visibilité',
      text: `L'idéologie ici est de proposer un outil à la fois national et local. La base de données est accessible à tous et
    contributive : de la plus petite collectivité à un hub, chacun peut implémenter sur son site cet outil et afficher
    l'offre de médiation de son territoire. En renseignant vos données sur la cartographie, ce n'est pas uniquement les
    usagers du site national qui auront accès aux informations de votre structure, mais également tout les usagers des
    sites web des collectivités qui auront intégré la plateforme !`,
      imageUrl: '/assets/img/presentation/svg-visibilite.svg',
      imageDescription: '',
      slideNumber: 1
    },
    {
      titre: 'La centralisation',
      text: `Travailler sur cette base de donnes commune permet d'avoir une gestion de la donnée centralisée, davantage actualisée
    et permettra d'améliorer la visibilité et faire gagner du temps aux professionnels de la médiation numérique.`,
      imageUrl: '/assets/img/presentation/svg-centralisation.svg',
      imageDescription: '',
      slideNumber: 2
    },
    {
      titre: "L'actualisation",
      text: `Notre proximité avec les structures de médiation numérique nous permet d'assurer des données actualisées il y a moins
    de 3 mois et ainsi éviter aux bénéficiaires de se rendre dans une structure fermée.`,
      imageUrl: '/assets/img/presentation/svg-actualisation.svg',
      imageDescription: '',
      slideNumber: 3
    }
  ];

  public carouselButtons: { number: number }[] = [{ number: 0 }, { number: 1 }, { number: 2 }, { number: 3 }];

  public switchSlide(value: number): void {
    this.currentSlide = value;
  }

  onPreviousClick() {
    this.currentSlide = this.currentSlide - 1 < 0 ? 3 : this.currentSlide - 1;
  }

  onNextClick() {
    this.currentSlide = this.currentSlide + 1 > 3 ? 0 : this.currentSlide + 1;
  }
}

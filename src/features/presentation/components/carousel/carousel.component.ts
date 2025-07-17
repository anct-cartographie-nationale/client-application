import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

const fadeIn = animation([style({ opacity: 0 }), animate('{{time}}', style({ opacity: 1 }))]);

const fadeOut = animation([animate('{{time}}', style({ opacity: 0 }))]);

type SlidePresentations = {
  titre: string;
  text: string;
  imageUrl: string;
  imageDescription: string;
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
  @Input() public currentSlide: number = 0;
  @Output() switchSlide: EventEmitter<number> = new EventEmitter<number>();
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() scrollToAnchor: EventEmitter<string> = new EventEmitter<string>();

  public slidePresentations: SlidePresentations[] = [
    {
      titre: 'Orientation',
      text: `En quelques secondes, renseignez les besoins d'un bénéficiaire, son adresse et ses disponibilités afin d'afficher uniquement les lieux qui pourront l'aider.`,
      imageUrl: '/assets/img/presentation/svg-orientation-vertical.svg',
      imageDescription: ''
    },
    {
      titre: 'Standardisation',
      text: '',
      imageUrl: '/assets/img/presentation/svg-centralisation-vertical.svg',
      imageDescription: ''
    },
    {
      titre: 'La mise à jour',
      text: `En collaboration avec La Coop de la médiation numérique,
      nous proposons à tous les acteurs de la médiation numérique de référencer et mettre à jour leur offre à un seul endroit tout en la rendant disponible partout,
      grâce à l'open data.`,
      imageUrl: '/assets/img/presentation/svg-actu-vertical.svg',
      imageDescription: ''
    },
    {
      titre: 'Visibilité',
      text: `Cette cartographie nationale est locale, la base de données est accessible à tous et contributive : de la plus petite collectivité à un hub,
       chacun peut l'implémenter sur son site et afficher l'offre de médiation numérique de son territoire.`,
      imageUrl: '/assets/img/presentation/svg-visibilite-vertical.svg',
      imageDescription: ''
    }
  ];
}

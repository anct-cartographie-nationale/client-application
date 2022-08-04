import { Component } from '@angular/core';
import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

const fadeIn = animation([style({ opacity: 0 }), animate('{{time}}', style({ opacity: 1 }))]);

const fadeOut = animation([animate('{{time}}', style({ opacity: 0 }))]);

@Component({
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

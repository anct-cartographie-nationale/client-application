import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = (pages: [string, string][]) =>
  trigger(
    'routeAnimations',
    pages.flatMap(([origin, destination]: [string, string]) => [
      transition(`${origin} => ${destination}`, [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ]),
        query(':enter', [style({ left: '100%' })]),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '-100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
        ])
      ]),
      transition(`${destination} => ${origin}`, [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ]),
        query(':enter', [style({ left: '-100%' })]),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
        ])
      ])
    ])
  );

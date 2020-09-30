import { BREAKPOINT } from '@angular/flex-layout';

const PRINT_BREAKPOINTS = [
  {
    alias: 'xs',
    mediaQuery: 'only screen and (min-width: 0px) and (max-width: 576px)',
  },
  {
    alias: 'lt-xs',
    mediaQuery: 'only screen and (max-width: 576px)',
  },
  {
    alias: 'gt-xs',
    mediaQuery: 'only screen and (min-width: 577px)',
  },
  {
    alias: 'sm',
    mediaQuery: 'only screen and (min-width: 577px) and (max-width: 768px)',
  },
  {
    alias: 'lt-sm',
    mediaQuery: 'only screen and (max-width: 768px)',
  },
  {
    alias: 'gt-sm',
    mediaQuery: 'only screen and (min-width: 769px)',
  },
  {
    alias: 'md',
    mediaQuery: 'only screen and (min-width: 769px) and (max-width: 992px)',
  },
  {
    alias: 'lt-md',
    mediaQuery: 'only screen and (max-width: 992px)',
  },
  {
    alias: 'gt-md',
    mediaQuery: 'only screen and (min-width: 993px)',
  },
  {
    alias: 'lg',
    mediaQuery: 'only screen and (min-width: 993px) and (max-width: 1200px)',
  },
  {
    alias: 'lt-lg',
    mediaQuery: 'only screen and (max-width: 1200px)',
  },
  {
    alias: 'gt-lg',
    mediaQuery: 'only screen and (min-width: 1201px)',
  },
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: PRINT_BREAKPOINTS,
  multi: true,
};

import { FactoryProvider } from '@angular/core';

export type SetTitleAction = (pages: (string | undefined)[]) => void;

export const SET_TITLE_ACTION: symbol = Symbol('page.set-title.action');

export const setTitleActionProvider = <TDependencies>(
  setTitleAction: (...providers: never[]) => SetTitleAction,
  deps: TDependencies[] = []
): FactoryProvider => ({
  provide: SET_TITLE_ACTION,
  useFactory: setTitleAction,
  deps
});

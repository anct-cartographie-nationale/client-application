import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultFoundPresentation } from '../presenters';

export type WithType<ResultType = string> = {
  type: ResultType;
};

export interface Searchable<T extends WithType = WithType> {
  search$(searchTerm: string): Observable<ResultFoundPresentation<T>[]>;
}

export const SEARCHABLE_TOKEN: InjectionToken<Searchable> = new InjectionToken<Searchable>('address.searchable');

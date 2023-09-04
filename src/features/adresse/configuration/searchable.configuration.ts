import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultFoundPresentation } from '../presenters';

export interface Searchable<T = {}> {
  search$(searchTerm: string): Observable<ResultFoundPresentation<T>[]>;
}

export const SEARCHABLE_TOKEN: InjectionToken<Searchable> = new InjectionToken<Searchable>('address.searchable');

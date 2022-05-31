import { Injectable } from '@angular/core';
import { Category, Module } from '@gouvfr-anct/mediation-numerique';
import { Observable, of } from 'rxjs';
import categoriesAccompagnement from '../static/categoriesAccompagnement.json';
import categoriesFormations from '../static/categoriesFormations.json';
import categoriesOthers from '../static/categoriesOthers.json';

@Injectable()
export class SearchService {
  public getCategoriesTraining(): Observable<Category[]> {
    return of(categoriesFormations.map((categorieFormations) => new Category(categorieFormations)));
  }

  public getCategoriesAccompaniment(): Observable<Category[]> {
    return of(categoriesAccompagnement.map((categorieAccompagnement) => new Category(categorieAccompagnement)));
  }

  public getCategoriesOthers(): Observable<Category[]> {
    return of(categoriesOthers.map((categorieOthers) => new Category(categorieOthers)));
  }

  public getIndex(array: Module[], id: string, categ: string): number {
    return array.findIndex((m: Module) => m.id === id && m.text === categ);
  }
}

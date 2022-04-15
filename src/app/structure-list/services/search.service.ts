import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Category } from '../models/category.model';
import { Module } from '../models/module.model';
import categoriesAccompagnement from '../../../assets/data/categoriesAccompagnement.json';
import categoriesFormations from '../../../assets/data/categoriesFormations.json';
import categoriesOthers from '../../../assets/data/categoriesOthers.json';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public getCategoriesTraining(): Observable<Category[]> {
    // return this.http
    //   .get('/api/categories/categoriesFormations')
    //   .pipe(map((data: any[]) => data.map((item) => new Category(item))));

    return of(categoriesFormations.map(categorieFormations => new Category(categorieFormations)))
  }
  public getCategoriesAccompaniment(): Observable<Category[]> {
    // return this.http
    //   .get('/api/categories/categoriesAccompagnement')
    //   .pipe(map((data: any[]) => data.map((item) => new Category(item))));

    return of(categoriesAccompagnement.map(categorieAccompagnement => new Category(categorieAccompagnement)))

  }
  public getCategoriesOthers(): Observable<Category[]> {
    // return this.http
    //   .get('/api/categories/categoriesOthers')
    //   .pipe(map((data: any[]) => data.map((item) => new Category(item))));

    return of(categoriesOthers.map(categorieOthers => new Category(categorieOthers)))

  }
  public getIndex(array: Module[], id: string, categ: string): number {
    return array.findIndex((m: Module) => m.id === id && m.text === categ);
  }
}

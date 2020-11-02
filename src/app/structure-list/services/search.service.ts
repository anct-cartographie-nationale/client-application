import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Module } from '../models/module.model';
import { StructureCounter } from '../models/structureCounter.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public getCategoriesFormations(): Observable<Category[]> {
    return this.http
      .get('/api/CategoriesFormations')
      .pipe(map((data: any[]) => data.map((item) => new Category(item))));
  }

  public getFakeCounterModule(): Observable<StructureCounter[]> {
    return this.http
      .get('/api/structures/count')
      .pipe(map((data: any[]) => data.map((item) => new StructureCounter(item))));
  }
  public setCountModules(category: Category, structureCountTab: StructureCounter[]): Category {
    category.modules.forEach((m: Module) => {
      for (let i = 0; i < structureCountTab.length; i++) {
        if (structureCountTab[i].id === m.id) {
          m.count = structureCountTab[i].count;
        }
      }
    });
    return category;
  }
}

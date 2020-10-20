import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get('/api/Categories').pipe(map((data: any[]) => data.map((item) => new Category(item))));
  }
  public getFakeCounterModule(): Observable<any> {
    return this.http.get('http://localhost:3000/structures/count');
  }
  public setCountModules(category: Category, structureCountTab: { id: number; count: number }[]): Category {
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

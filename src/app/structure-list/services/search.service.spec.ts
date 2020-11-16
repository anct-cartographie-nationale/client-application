import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { StructureCounter } from '../models/structureCounter.model';
import { Category } from '../models/category.model';
import { Module } from '../models/module.model';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return category with number of modules inside', () => {
    const structureCount: StructureCounter[] = [
      { id: '176', count: 2 },
      { id: '172', count: 1 },
      { id: '173', count: 1 },
    ];
    const m1: Module = new Module('176', 'strm1');
    const m2: Module = new Module('173', 'strm2');
    const m3: Module = new Module('172', 'strm3');
    const category: Category = new Category({ name: 'strCateg', modules: [m1, m2, m3] });
    const result = service.setCountModules(category, structureCount);
    expect(result.modules[0].count).toBe(2);
    expect(result.modules[1].count).toBe(1);
    expect(result.modules[2].count).toBe(1);
  });

  it('should return an index about finding module', () => {
    const m1: Module = new Module('176', 'strm1');
    const m2: Module = new Module('173', 'strm2');
    const m3: Module = new Module('172', 'strm3');
    const arrayModule: Module[] = [m1, m2, m3];
    const index = service.getIndex(arrayModule, m2.id, m2.text);
    expect(index).toBe(1);
  });
});

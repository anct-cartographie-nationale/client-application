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
      { id: 176, count: 2 },
      { id: 172, count: 1 },
      { id: 173, count: 1 },
    ];
    const m1: Module = { id: 176, text: 'strm1', count: 0 };
    const m2: Module = { id: 173, text: 'strm2', count: 0 };
    const m3: Module = { id: 172, text: 'strm3', count: 0 };
    const category: Category = { name: 'strCateg', modules: [m1, m2, m3] };
    const result = service.setCountModules(category, structureCount);
    expect(result.modules[0].count).toBe(2);
    expect(result.modules[1].count).toBe(1);
    expect(result.modules[2].count).toBe(1);
  });
});

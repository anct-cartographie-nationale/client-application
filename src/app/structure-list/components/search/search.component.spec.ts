import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { SearchService } from '../../services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filters', () => {
    const filter: Filter[] = [new Filter('nom', 'valInput', false)];
    spyOn(component.searchEvent, 'emit');
    component.applyFilter('valInput');
    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(filter);
  });

  it('should update categories', () => {
    let categories: Category[] = [new Category({ name: 'Accompagnement des démarches' })];
    categories[0].modules = [];
    for (let i = 0; i < 7; i++) {
      categories[0].modules.push(new Module(5 + i, 'CAF' + i));
    }
    component.openModal('accompagnement');
    expect(component.categories).toEqual(categories);
  });
});

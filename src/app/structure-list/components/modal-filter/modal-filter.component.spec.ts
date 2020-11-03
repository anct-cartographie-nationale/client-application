import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';

import { ModalFilterComponent } from './modal-filter.component';

describe('ModalFilterComponent', () => {
  let component: ModalFilterComponent;
  let fixture: ComponentFixture<ModalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit modules', () => {
    const modules: Module[] = [
      { id: '176', text: 'training', count: 3 },
      { id: '173', text: 'training', count: 2 },
      { id: '172', text: 'training', count: 2 },
    ];
    spyOn(component.searchEvent, 'emit');
    component.emitModules(modules);
    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(modules);
  });
  it('should return an index or -1', () => {
    const modules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 },
    ];
    component.checkedModules = modules;
    const foundItem = component.getIndex('173', 'training');
    const notFoundItem = component.getIndex('189', 'training');
    expect(foundItem).toEqual(1);
    expect(notFoundItem).toEqual(-1);
  });
  it('should add a module to checkedModule array', () => {
    const modules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 },
    ];
    component.checkedModules = modules;
    const evt = { target: { checked: true, value: '175' } };
    component.onCheckboxChange(evt, 'training');
    expect(component.checkedModules.length).toEqual(4);
  });
  it('should remove a module to checkedModule array', () => {
    const modules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 },
    ];
    component.checkedModules = modules;
    const evt = { target: { checked: false, value: '173' } };
    component.onCheckboxChange(evt, 'training');
    expect(component.checkedModules.length).toEqual(2);
  });
  it('should remove all modules checked from same modal, here morefilters', () => {
    const modules: Module[] = [
      { id: '176', text: 'morefilters', count: 0 },
      { id: '173', text: 'morefilters', count: 0 },
      { id: '172', text: 'morefilters', count: 0 },
      { id: '179', text: 'training', count: 0 },
      { id: '190', text: 'training', count: 0 },
      { id: '167', text: 'training', count: 0 },
    ];
    component.checkedModules = modules;
    const category: Category = { name: 'morefilters', modules: [modules[0], modules[1], modules[2]] };
    component.categories = [category];
    component.clearFilters();
    expect(component.checkedModules.length).toEqual(3);
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeModal } from '../../enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Module } from '../../models/module.model';

import { ModalFilterComponent } from './modal-filter.component';

describe('ModalFilterComponent', () => {
  let component: ModalFilterComponent;
  let fixture: ComponentFixture<ModalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFilterComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
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

  // emitModules function
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

  // onCheckboxChange function
  it('should add a module to checkedModule array', () => {
    const modules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 },
    ];
    component.checkedModules = modules;
    const evt = { target: { checked: true, value: '175' } };
    component.onCheckboxChange(evt, 'training', false);
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
    component.onCheckboxChange(evt, 'training', false);
    expect(component.checkedModules.length).toEqual(2);
  });

  // clearFilters function
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
    const category: Category = new Category({ name: 'morefilters', modules: [modules[0], modules[1], modules[2]] });
    component.categories = [category];
    component.clearFilters();
    expect(component.checkedModules.length).toEqual(3);
  });

  // getModalType function
  it('should return string of type about current enum', () => {
    component.modalType = TypeModal.training;
    const resultTraining = component.getModalType();
    component.modalType = TypeModal.accompaniment;
    const resultAccopaniment = component.getModalType();
    component.modalType = TypeModal.moreFilters;
    const resultMoreFilters = component.getModalType();
    expect(resultTraining).toEqual('training');
    expect(resultMoreFilters).toEqual('moreFilters');
    expect(resultAccopaniment).toEqual('');
  });

  // closeModal function
  it('should emit modules', () => {
    spyOn(component.closeEvent, 'emit');
    component.closeModal();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Filter } from '../../models/filter.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StructureListSearchComponent } from './structure-list-search.component';
import { Module } from '../../models/module.model';
import { TypeModal } from '../../enum/typeModal.enum';
import { GeojsonService } from '../../../services/geojson.service';
import { GeoJson } from '../../../map/models/geojson.model';
import { of } from 'rxjs';

describe('StructureListSearchComponent', () => {
  let component: StructureListSearchComponent;
  let fixture: ComponentFixture<StructureListSearchComponent>;
  let geoService: GeojsonService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureListSearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    geoService = TestBed.inject(GeojsonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // applyFilter function
  it('should emit filters', () => {
    const filter: Filter[] = [new Filter('query', 'valInput')];
    spyOn(component.searchEvent, 'emit');
    component.applyFilter('valInput');
    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(filter);
  });

  // countCheckFiltersOnModules function
  it('should return a number of checked elements in an array', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 }
    ];

    const nbCheckedElements: number = component.countCheckFiltersOnModules(checkedModules, 2);
    expect(nbCheckedElements).toEqual(1);
  });
  it('should return 0 of checked elements in an array', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'training', count: 0 },
      { id: '172', text: 'training', count: 0 }
    ];

    const nbCheckedElements: number = component.countCheckFiltersOnModules(checkedModules, 3);
    expect(nbCheckedElements).toEqual(0);
  });

  // fetchResults function
  it('should update number of checked elements in current filter', () => {
    const checkedModules: Module[] = [
      { id: '176', text: 'training', count: 0 },
      { id: '173', text: 'accompaniment', count: 0 },
      { id: '172', text: 'accompaniment', count: 0 },
      { id: '180', text: 'moreFilters', count: 0 },
      { id: '130', text: 'moreFilters', count: 0 },
      { id: '219', text: 'moreFilters', count: 0 }
    ];
    component.modalTypeOpened = TypeModal.training;
    component.numberAccompanimentChecked = 2;
    component.numberMoreFiltersChecked = 3;
    component.fetchResults(checkedModules);
    expect(component.numberTrainingChecked).toEqual(1);
  });
  // openModal function
  it('should open modal', () => {
    component.openModal(TypeModal.training);
    expect(component.modalTypeOpened).toEqual(TypeModal.training);
  });
  // closeModal function
  it('should close modal', () => {
    component.modalTypeOpened = TypeModal.training;
    component.closeModal();
    expect(component.modalTypeOpened).toBeUndefined();
  });
  // externalCheckboxCheck function
  it('should add numericPass filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: true, value: 'Pass numérique' } };
    const categ = 'Labels et qualifications';
    component.externalCheckboxCheck(evt, categ);
    const expectArray: Module[] = [new Module(evt.target.value, categ)];
    expect(component.checkedModulesFilter).toEqual(expectArray);
    expect(component.numberMoreFiltersChecked).toEqual(1);
  });
  it('should remove conseillerNumFranceServices filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: false, value: 'Conseiller numérique' } };
    const categ = 'Labels et qualifications';
    const checkedModules: Module[] = [{ id: evt.target.value, text: categ, count: 0 }];
    component.checkedModulesFilter = checkedModules;
    component.externalCheckboxCheck(evt, categ);
    new Module(evt.target.value, categ);
    expect(component.checkedModulesFilter.length).toEqual(0);
    expect(component.numberMoreFiltersChecked).toEqual(0);
  });
  it('should add conseillerNumFranceServices filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: true, value: 'Conseiller numérique' } };
    const categ = 'Labels et qualifications';
    component.externalCheckboxCheck(evt, categ);
    const expectArray: Module[] = [new Module(evt.target.value, categ)];
    expect(component.checkedModulesFilter).toEqual(expectArray);
    expect(component.numberMoreFiltersChecked).toEqual(1);
  });
  it('should remove numericPass filter to array of current filters and increment by one number of moreFilters element', () => {
    const evt = { target: { checked: false, value: 'Pass numérique' } };
    const categ = 'Labels et qualifications';
    const checkedModules: Module[] = [{ id: evt.target.value, text: categ, count: 0 }];
    component.checkedModulesFilter = checkedModules;
    component.externalCheckboxCheck(evt, categ);
    new Module(evt.target.value, categ);
    expect(component.checkedModulesFilter.length).toEqual(0);
    expect(component.numberMoreFiltersChecked).toEqual(0);
  });
  // learInput function
  it('should reset form', () => {
    component.searchForm.setValue({ searchTerm: 'someSearchTerm' });
    component.clearInput();
    expect(component.searchForm.get('searchTerm').value).toBeNull();
  });
  // locateMe function
  it('should update form with the correct address ', () => {
    let fakeGeo: GeoJson = new GeoJson({ properties: { name: 'Rue du lac' } });

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
      var position = { coords: { latitude: 45.7585243, longitude: 4.85442 } };
      arguments[0](position);
    });
    spyOn(geoService, 'getAddressByCoord').and.callFake(function () {
      return of(fakeGeo);
    });
    component.locateMe();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(geoService.getAddressByCoord).toHaveBeenCalled();
    expect(component.searchForm.get('searchTerm').value).toBe('Rue du lac');
  });
});

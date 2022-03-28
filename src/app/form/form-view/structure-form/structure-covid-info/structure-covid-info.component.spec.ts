import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureCovidInfoComponent } from './structure-covid-info.component';

describe('StructureCovidInfoComponent', () => {
  let component: StructureCovidInfoComponent;
  let fixture: ComponentFixture<StructureCovidInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureCovidInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureCovidInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

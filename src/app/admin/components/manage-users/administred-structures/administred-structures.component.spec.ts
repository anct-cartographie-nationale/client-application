import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministredStructuresComponent } from './administred-structures.component';

describe('AdministredStructuresComponent', () => {
  let component: AdministredStructuresComponent;
  let fixture: ComponentFixture<AdministredStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministredStructuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministredStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

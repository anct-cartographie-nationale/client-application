import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDigitalHelpingAccompanimentComponent } from './structure-digital-helping-accompaniment.component';

describe('StructureDigitalHelpingAccompanimentComponent', () => {
  let component: StructureDigitalHelpingAccompanimentComponent;
  let fixture: ComponentFixture<StructureDigitalHelpingAccompanimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDigitalHelpingAccompanimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDigitalHelpingAccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

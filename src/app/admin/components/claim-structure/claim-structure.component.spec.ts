import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimStructureComponent } from './claim-structure.component';

describe('ClaimStructureComponent', () => {
  let component: ClaimStructureComponent;
  let fixture: ComponentFixture<ClaimStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimStructureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStructuresListComponent } from './admin-structures-list.component';

describe('AdminStructuresListComponent', () => {
  let component: AdminStructuresListComponent;
  let fixture: ComponentFixture<AdminStructuresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStructuresListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStructuresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

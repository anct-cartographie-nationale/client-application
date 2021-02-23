import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptionsComponent } from './modal-options.component';

describe('ModalConfirmationComponent', () => {
  let component: ModalOptionsComponent;
  let fixture: ComponentFixture<ModalOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

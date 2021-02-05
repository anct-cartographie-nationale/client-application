import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPasteComponent } from './copy-paste.component';

describe('CopyPasteComponent', () => {
  let component: CopyPasteComponent;
  let fixture: ComponentFixture<CopyPasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyPasteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

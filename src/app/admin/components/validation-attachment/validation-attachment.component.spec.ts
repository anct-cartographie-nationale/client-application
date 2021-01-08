import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAttachmentComponent } from './validation-attachment.component';

describe('ValidationAttachmentComponent', () => {
  let component: ValidationAttachmentComponent;
  let fixture: ComponentFixture<ValidationAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

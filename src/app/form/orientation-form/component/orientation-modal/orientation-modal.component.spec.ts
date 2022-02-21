import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationComponent } from './orientation-modal.component';

describe('OrientationModalComponent', () => {
  let component: OrientationComponent;
  let fixture: ComponentFixture<OrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrientationComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

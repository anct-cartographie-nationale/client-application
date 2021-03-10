import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalFiltersComponent } from './post-modal-filters.component';

describe('PostModalFiltersComponent', () => {
  let component: PostModalFiltersComponent;
  let fixture: ComponentFixture<PostModalFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostModalFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

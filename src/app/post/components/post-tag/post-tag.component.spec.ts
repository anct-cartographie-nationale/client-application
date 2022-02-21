import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTagComponent } from './post-tag.component';

describe('PostTagComponent', () => {
  let component: PostTagComponent;
  let fixture: ComponentFixture<PostTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayOnMapLinkComponent } from './display-on-map-link.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DisplayOnMapLinkComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DisplayOnMapLinkComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of([])
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DisplayOnMapLinkComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<DisplayOnMapLinkComponent> = TestBed.createComponent(DisplayOnMapLinkComponent);
    const component: DisplayOnMapLinkComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

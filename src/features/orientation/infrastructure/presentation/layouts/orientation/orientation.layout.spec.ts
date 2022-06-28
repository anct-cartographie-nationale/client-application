import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrientationLayout } from './orientation.layout';
import { LieuxMediationNumeriqueRepository } from '../../../../../cartographie/domain';
import { of } from 'rxjs';

describe('OrientationLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [OrientationLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LieuxMediationNumeriqueRepository,
          useValue: {
            getAll$: () => of([])
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('OrientationLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<OrientationLayout> = TestBed.createComponent(OrientationLayout);
    const orientationLayout: OrientationLayout = fixture.componentInstance;
    expect(orientationLayout).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FEATURES_TOKEN } from '../../../../root';
import { OrientationLayout } from '../../layouts';
import { CollapseStubComponent } from '../../test-doubles';
import { DisponibilitePage } from './disponibilite.page';

describe('DisponibilitePage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DisponibilitePage, CollapseStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: OrientationLayout,
          useValue: {
            filterForm: new FormGroup({})
          }
        },
        {
          provide: FEATURES_TOKEN,
          useValue: new Map()
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DisponibilitePage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DisponibilitePage> = TestBed.createComponent(DisponibilitePage);
    const disponibilitePage: DisponibilitePage = fixture.componentInstance;
    expect(disponibilitePage).toBeTruthy();
  });
});

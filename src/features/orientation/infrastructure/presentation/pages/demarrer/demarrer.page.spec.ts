import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DemarrerPage } from './demarrer.page';
import { BRAND_TOKEN } from '../../../../../../root';
import { OrientationLayout } from '../../layouts';

describe('DemarrerPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DemarrerPage],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {}
        },
        {
          provide: OrientationLayout,
          useValue: {
            filterForm: new FormGroup({})
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DemarrerPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DemarrerPage> = TestBed.createComponent(DemarrerPage);
    const demarrerPage: DemarrerPage = fixture.componentInstance;
    expect(demarrerPage).toBeTruthy();
  });
});

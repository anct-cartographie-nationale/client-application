import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { AddressFieldStubComponent } from '../../../adresse/test-doubles';
import { CollapseStubComponent } from '../../test-doubles';
import { OrientationLayout } from '../../layouts';
import { LocalisationPage } from './localisation.page';

describe('LocalisationPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LocalisationPage, AddressFieldStubComponent, CollapseStubComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: AddressRepository,
          useValue: {
            search$: () => of([])
          }
        },
        {
          provide: AddressPresenter,
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
        throw new Error('LocalisationPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LocalisationPage> = TestBed.createComponent(LocalisationPage);
    const localisationPage: LocalisationPage = fixture.componentInstance;
    expect(localisationPage).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AddressPresenter } from '../../../../domain/presenters';
import { AddressRepository } from '../../../../domain/repositories';
import { GeolocationPresenter } from '../../../../../cartographie/domain';
import { AddressFieldStubComponent, CollapseStubComponent } from '../../test-doubles';
import { LocalisationPage } from './localisation.page';

describe('LocalisationPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LocalisationPage, AddressFieldStubComponent, CollapseStubComponent],
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
          provide: GeolocationPresenter,
          useValue: {}
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

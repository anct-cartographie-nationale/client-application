import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BesoinPage } from './besoin.page';
import { CollapseStubComponent } from '../../test-doubles';
import { OrientationLayout } from '../../layouts';

describe('BesoinPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [BesoinPage, CollapseStubComponent],
      providers: [
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
        throw new Error('BesoinPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<BesoinPage> = TestBed.createComponent(BesoinPage);
    const besoinPage: BesoinPage = fixture.componentInstance;
    expect(besoinPage).toBeTruthy();
  });
});
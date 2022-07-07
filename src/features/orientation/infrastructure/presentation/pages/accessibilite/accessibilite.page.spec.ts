import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AccessibilitePage } from './accessibilite.page';
import { OrientationLayout } from '../../layouts';
import { CollapseStubComponent } from '../../test-doubles';

describe('accessibilitePage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AccessibilitePage, CollapseStubComponent],
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
        throw new Error('accessibilitePage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<AccessibilitePage> = TestBed.createComponent(AccessibilitePage);
    const accessibilitePage: AccessibilitePage = fixture.componentInstance;
    expect(accessibilitePage).toBeTruthy();
  });
});

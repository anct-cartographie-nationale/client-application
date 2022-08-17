import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationRootLayout } from './application-root-layout.component';
import { BRAND_TOKEN } from '../../configuration';
import { ConteneurStubComponent } from '../../test-doubles';

describe('ApplicationRootLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationRootLayout, ConteneurStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('ApplicationRootLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<ApplicationRootLayout> = TestBed.createComponent(ApplicationRootLayout);
    const applicationRootLayout: ApplicationRootLayout = fixture.componentInstance;
    expect(applicationRootLayout).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureWebAndSocialNetworkComponent } from './structure-web-and-social-network.component';

describe('StructureWebAndSocialNetworkComponent', () => {
  let component: StructureWebAndSocialNetworkComponent;
  let fixture: ComponentFixture<StructureWebAndSocialNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureWebAndSocialNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureWebAndSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

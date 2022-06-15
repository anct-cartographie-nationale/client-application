import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../../animation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orientation.layout.html',
  animations: [
    slideInAnimation([
      ['DemarrerPage', 'BesoinPage'],
      ['DemarrerPage', 'LocalisationPage'],
      ['DemarrerPage', 'SpecificitePage'],
      ['DemarrerPage', 'DatePage'],
      ['BesoinPage', 'LocalisationPage'],
      ['BesoinPage', 'SpecificitePage'],
      ['BesoinPage', 'DatePage'],
      ['LocalisationPage', 'SpecificitePage'],
      ['LocalisationPage', 'DatePage'],
      ['SpecificitePage', 'DatePage']
    ])
  ]
})
export class OrientationLayout {
  public constructor(private contexts: ChildrenOutletContexts) {}

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

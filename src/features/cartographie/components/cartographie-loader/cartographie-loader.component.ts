import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cartographie-loader',
  templateUrl: './cartographie-loader.component.html'
})
export class CartographieLoaderComponent {}

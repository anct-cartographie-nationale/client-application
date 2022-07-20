import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

type CollapseState = 'expanded' | 'collapsed';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  animations: [
    trigger('collapsible', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('.2s ease-in'))
    ])
  ]
})
export class CollapsibleComponent {
  private _state: CollapseState = 'collapsed';

  public get state(): CollapseState {
    return this._state;
  }

  public get isCollapsed(): boolean {
    return this._state === 'collapsed';
  }

  public get isExpanded(): boolean {
    return this._state === 'expanded';
  }

  public toggle(): void {
    this._state = this._state === 'expanded' ? 'collapsed' : 'expanded';
  }
}

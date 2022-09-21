import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable } from 'rxjs';

type CollapseState = 'expanded' | 'collapsed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  animations: [
    trigger('collapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden', visibility: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('.2s ease-in'))
    ])
  ]
})
export class CollapseComponent {
  private readonly _state$: BehaviorSubject<CollapseState> = new BehaviorSubject<CollapseState>('collapsed');

  public readonly state$: Observable<CollapseState> = this._state$.asObservable();

  public get isCollapsed(): boolean {
    return this._state$.value === 'collapsed';
  }

  public get isExpanded(): boolean {
    return this._state$.value === 'expanded';
  }

  public toggle(): void {
    this._state$.next(this._state$.value === 'expanded' ? 'collapsed' : 'expanded');
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, BehaviorSubject, delay } from 'rxjs';
import { map } from 'rxjs/operators';

type CollapseState = 'expanded' | 'collapsed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-collapse[control]',
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
  @Input() public set state(state: CollapseState) {
    this._state$.next(state);
  }

  @Input() control!: HTMLElement;

  private readonly _state$: BehaviorSubject<CollapseState> = new BehaviorSubject<CollapseState>('collapsed');

  public readonly state$: Observable<CollapseState> = this._state$.asObservable();

  public isCollapsed$: Observable<boolean> = this.state$.pipe(map((state: CollapseState) => state === 'collapsed'));

  public isExpanded$: Observable<boolean> = this.state$.pipe(map((state: CollapseState) => state === 'expanded'));

  public toggle(): void {
    this._state$.next(this._state$.value === 'expanded' ? 'collapsed' : 'expanded');
  }
}

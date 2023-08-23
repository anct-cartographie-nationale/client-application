/* eslint-disable @angular-eslint/component-selector */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const DEFAULT_INDEX: number = -1;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dropdownPane',
  selector: '[appDropdownPane]',
  templateUrl: './dropdown-pane.component.html'
})
export class DropdownPaneComponent {
  private _expanded: boolean = false;

  private readonly _expanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._expanded);

  public activeIndex: number = DEFAULT_INDEX;

  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  @ContentChildren('results') public results!: QueryList<ElementRef>;

  @Input() public dropdownControl: HTMLElement | null = null;

  @Output() public readonly indexChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() public set expanded(expanded: boolean) {
    this._expanded$.next(expanded);
    this._expanded = expanded;
  }

  public expand(): void {
    this._expanded$.next(true);
    this._expanded = true;
    this.activeIndex = 0;
  }

  public reduce(): void {
    this.dropdownControl?.focus();
    this._expanded$.next(false);
    this._expanded = false;
  }

  public setIndex(index: number): void {
    this.activeIndex = index;
    this.indexChange.next(this.activeIndex);
  }

  public nextIndex(): void {
    this.activeIndex === this.results.length - 1 ? this.setIndex(0) : this.setIndex(this.activeIndex + 1);
  }

  public previousIndex(): void {
    this.activeIndex === 0 ? this.setIndex(this.results.length - 1) : this.setIndex(this.activeIndex - 1);
  }

  public focus(): void {
    if (this.results == null || this.results.first == null) return;
    this.results.first.nativeElement.firstChild.focus();
  }
}

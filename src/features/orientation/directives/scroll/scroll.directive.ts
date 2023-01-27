import { Directive, DoCheck, ElementRef, EventEmitter, Output } from '@angular/core';

const hasReachedScrollEnd = (element: HTMLElement): boolean => element.scrollTop + element.offsetHeight >= element.scrollHeight;

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements DoCheck {
  @Output() public reachEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _elementRef: ElementRef) {}

  public ngDoCheck(): void {
    setTimeout(() => this.reachEnd.emit(hasReachedScrollEnd(this._elementRef.nativeElement)));
  }
}

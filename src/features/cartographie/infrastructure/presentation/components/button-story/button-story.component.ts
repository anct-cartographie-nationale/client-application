import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-storybook-button',
  template: `
    <button
      type="button"
      (click)="clickChange.emit($event)"
      [ngClass]="classes"
      [ngStyle]="{ 'background-color': backgroundColor }">
      {{ label }}
    </button>
  `
})
export default class ButtonStoryComponent {
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Optional click handler
   */
  @Output()
  clickChange = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }
}

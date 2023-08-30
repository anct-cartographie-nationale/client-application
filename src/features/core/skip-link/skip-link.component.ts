import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkipLinkPresenter } from './skip-link.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skip-link[fragment]',
  templateUrl: './skip-link.component.html'
})
export class SkipLinkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') public content!: TemplateRef<unknown>;

  @Input() public fragment!: string;

  public constructor(private readonly _route: ActivatedRoute, private readonly _skipLinkPresenter: SkipLinkPresenter) {}

  public ngAfterViewInit(): void {
    this._skipLinkPresenter.set(this, {
      fragment: this.fragment,
      content: this.content,
      route: this._route
    });
  }

  public ngOnDestroy(): void {
    this._skipLinkPresenter.delete(this);
  }
}

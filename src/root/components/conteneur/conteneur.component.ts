import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BRAND_CONFIGURATION, BRAND_TOKEN, BrandConfiguration } from '../../configuration';

const ANIMATION_DURATION = 300 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conteneur',
  templateUrl: './conteneur.component.html'
})
export class ConteneurComponent {
  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  private _showing$: Subject<boolean> = new Subject<boolean>();
  public showing$: Observable<boolean> = this._showing$.asObservable();

  private _hiding$: Subject<boolean> = new Subject<boolean>();
  public hiding$: Observable<boolean> = this._hiding$.asObservable();

  private _isExpanded: boolean = false;

  private _expanded$: Subject<boolean> = new Subject<boolean>();
  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly router: Router
  ) {}

  public close(): void {
    this._isExpanded && this._hiding$.next(true);
    this._isExpanded = false;
    this._expanded$.next(false);

    setTimeout(() => {
      this._showing$.next(false);
      this._hiding$.next(false);
    }, ANIMATION_DURATION);
  }

  public toggle(): void {
    this._isExpanded ? this._hiding$.next(true) : this._showing$.next(true);
    this._isExpanded = !this._isExpanded;
    this._expanded$.next(this._isExpanded);

    setTimeout(() => {
      this._showing$.next(false);
      this._hiding$.next(false);
    }, ANIMATION_DURATION);
  }
}

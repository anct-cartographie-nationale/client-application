import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND_CONFIGURATION, BRAND_TOKEN, BrandConfiguration } from '../../configuration';
import { Observable, Subject } from 'rxjs';

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

  private _height$: Subject<number> = new Subject<number>();
  public height$: Observable<number> = this._height$.asObservable();

  private _collapsing$: Subject<boolean> = new Subject<boolean>();
  public collapsing$: Observable<boolean> = this._collapsing$.asObservable();

  private _isExpanded: boolean = false;

  private _expanded$: Subject<boolean> = new Subject<boolean>();
  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly router: Router
  ) {}

  public toggle() {
    this._isExpanded = !this._isExpanded;
    this._expanded$.next(this._isExpanded);
    this._height$.next(this._isExpanded ? 196 : 0);
    this._collapsing$.next(true);
    setTimeout(() => {
      this._collapsing$.next(false);
    }, 0);
  }
}

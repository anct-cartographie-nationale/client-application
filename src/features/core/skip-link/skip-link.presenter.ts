import { SkipLink } from './skip-link';
import { SkipLinkComponent } from './skip-link.component';
import { BehaviorSubject, Observable } from 'rxjs';

const SKIP_LINKS_MAP: Map<SkipLinkComponent, SkipLink> = new Map<SkipLinkComponent, SkipLink>();

export class SkipLinkPresenter {
  private readonly _skipLinks$: BehaviorSubject<SkipLink[]> = new BehaviorSubject<SkipLink[]>([]);

  public readonly skipLinks$: Observable<SkipLink[]> = this._skipLinks$.asObservable();

  public set(reference: SkipLinkComponent, skipLink: SkipLink): void {
    SKIP_LINKS_MAP.set(reference, skipLink);
    this._skipLinks$.next(Array.from(SKIP_LINKS_MAP.values()));
  }

  public delete(reference: SkipLinkComponent): void {
    SKIP_LINKS_MAP.delete(reference);
    this._skipLinks$.next(Array.from(SKIP_LINKS_MAP.values()));
  }
}

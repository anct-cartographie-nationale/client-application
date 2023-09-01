import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { regionFromNom, RegionPresentation } from '../../../core/presenters';
import { BreadcrumbItem, getBreadcrumbItems } from '../../presenters';
import { Observable, Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-location-breadcrumb',
  templateUrl: './location-breadcrumb.component.html'
})
export class LocationBreadcrumbComponent implements OnChanges {
  @Input() public url: UrlSegment[] = [];

  @Input() public zoom: number = 0;

  @Output() public showLieux: EventEmitter<RegionPresentation | undefined> = new EventEmitter<RegionPresentation | undefined>();

  @Output() public region: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  @Output() public departement: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  private readonly _breadcrumbItems$: Subject<BreadcrumbItem[]> = new Subject<BreadcrumbItem[]>();

  public readonly breadcrumbItems$: Observable<BreadcrumbItem[]> = this._breadcrumbItems$.asObservable();

  public ngOnChanges(): void {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems(this.url, this.zoom);
    this._breadcrumbItems$.next(breadcrumbItems);
    breadcrumbItems.length > 1 ? this.region.emit(breadcrumbItems[1].label) : this.region.emit();
    breadcrumbItems.length > 2 ? this.departement.emit(breadcrumbItems[2].label) : this.departement.emit();
  }

  public onClick(nom: string): void {
    this.showLieux.emit(regionFromNom(nom));
  }
}

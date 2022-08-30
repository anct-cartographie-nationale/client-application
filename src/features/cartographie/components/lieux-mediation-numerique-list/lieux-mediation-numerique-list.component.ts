import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FeatureConfiguration } from '../../../../root';
import { LieuMediationNumeriquePresentation } from '../../../core';

const itemById =
  (id: string) =>
  (item: ElementRef): boolean =>
    item.nativeElement.id === id;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-list',
  templateUrl: './lieux-mediation-numerique-list.component.html'
})
export class LieuxMediationNumeriqueListComponent {
  @Input() public lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

  @Input() public orientationFeature?: FeatureConfiguration;

  @Input() public set focusId(focusId: string | null) {
    focusId && this.scrollTo(focusId);
  }

  @Input() public highlightedId?: string;

  @Output() public print: EventEmitter<void> = new EventEmitter<void>();

  @Output() public selectLieu: EventEmitter<LieuMediationNumeriquePresentation> =
    new EventEmitter<LieuMediationNumeriquePresentation>();

  @ViewChild('container') public container!: ElementRef;

  @ViewChildren('item') public items!: QueryList<ElementRef>;

  public constructor(public readonly route: ActivatedRoute) {
    console.log('test', this.highlightedId);
  }

  changeStyle($event: any, lieuMediationNumeriqueID: string) {
    $event.type === 'mouseover' ? (this.highlightedId = lieuMediationNumeriqueID) : (this.highlightedId = '');
    // this.items.find(itemById(lieuMediationNumeriqueID))?
  }

  public scrollTo(focusId: string) {
    setTimeout(() => {
      this.container.nativeElement.scrollTo({
        top:
          this.items.find(itemById(focusId))?.nativeElement.getBoundingClientRect().y -
          this.container.nativeElement.getBoundingClientRect().y,
        behavior: 'smooth'
      });
    }, 400);
  }

  public trackByLieuId(_: number, lieu: LieuMediationNumeriquePresentation) {
    return lieu.id;
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

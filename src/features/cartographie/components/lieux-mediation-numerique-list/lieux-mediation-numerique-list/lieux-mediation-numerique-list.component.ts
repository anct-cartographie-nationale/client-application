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
import { ActivatedRoute } from '@angular/router';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FeatureConfiguration } from '../../../../../root';
import { LieuMediationNumeriqueListItemPresentation } from '../../../presenters';
import { ClustersPresenter } from '../../../../core/presenters/clusters';
import { CartographieLayout } from '../../../layouts';

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
  @Input() public lieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [];

  @Input() public hoverId: string | null = null;

  @Input() public orientationFeature?: FeatureConfiguration;

  @Input() public set focusId(focusId: string | undefined) {
    focusId && this.scrollTo(focusId);
  }

  @Output() public print: EventEmitter<void> = new EventEmitter<void>();

  @Output() public selectLieu: EventEmitter<LieuMediationNumeriqueListItemPresentation> =
    new EventEmitter<LieuMediationNumeriqueListItemPresentation>();

  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();

  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  @Output() public showLabel: EventEmitter<LabelNational> = new EventEmitter<LabelNational>();

  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @ViewChild('container') public container!: ElementRef;

  @ViewChildren('item') public items!: QueryList<ElementRef>;

  public constructor(
    public readonly route: ActivatedRoute,
    public readonly cartographieLayout: CartographieLayout,
    public readonly clustersPresenter: ClustersPresenter
  ) {}

  public scrollTo(focusId: string): void {
    setTimeout((): void => {
      const item: ElementRef<HTMLElement> | undefined = this.items?.find(itemById(focusId));
      item &&
        this.container.nativeElement.scrollTo({
          top: item.nativeElement.getBoundingClientRect().y - this.container.nativeElement.getBoundingClientRect().y,
          behavior: 'smooth'
        });
      item && (item?.nativeElement.querySelectorAll('.link-lieu') as NodeListOf<HTMLElement>)[0].focus();
    });
  }

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueListItemPresentation) {
    return lieu.id;
  }
}

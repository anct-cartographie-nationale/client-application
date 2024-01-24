import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-result-count',
  templateUrl: './filter-result-count.component.html'
})
export class FilterResultCountComponent implements AfterViewInit {
  @Input() public total: number = 0;

  @Input() public found: number = 0;

  @ViewChild('textElement') public textElement!: ElementRef;

  public initialFontSize: string = '32px';
  public pageIsZoomed: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.pageIsZoomed = getComputedStyle(this.textElement.nativeElement).fontSize > this.initialFontSize;
    this.cdr.detectChanges();
  }
}

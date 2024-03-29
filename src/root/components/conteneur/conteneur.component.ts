import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { OffcanvasComponent, SkipLinkPresenter } from '../../../features/core';
import { BRAND_CONFIGURATION, BRAND_TOKEN, BrandConfiguration } from '../../configuration';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conteneur',
  templateUrl: './conteneur.component.html'
})
export class ConteneurComponent implements OnInit {
  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  @ViewChild('navbarOffcanvas') navbarOffcanvas!: OffcanvasComponent;

  @ViewChild('container', { static: true }) container!: ElementRef;

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly skipLinkPresenter: SkipLinkPresenter,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public readonly router: Router
  ) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.container.nativeElement) {
        this.container.nativeElement.scrollTop = 0;
      }
    });
  }

  public skipTo(id: string): void {
    const targetElement = this.elementRef.nativeElement.querySelector(`#${id}`);
    if (!targetElement) return;
    this.renderer.setAttribute(targetElement, 'tabindex', '-1');
    targetElement.focus();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.renderer.removeAttribute(targetElement, 'tabindex');
  }
}

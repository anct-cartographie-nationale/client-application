import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import packageJson from '../../../package.json';
import { Page } from './models/page.model';
import { PageService } from './services/page.service';
import { PageEnum } from './enum/page.enum';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  public page: Page;
  public version: string;
  private slugPage: string;
  private quiSommesNous = PageEnum.quiSommesNous;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private pageService: PageService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.slugPage = routeParams.slugPage;
      this.pageService.getPage(this.slugPage).subscribe((page) => {
        this.page = page.pages[0];
        this.page.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.html);
        this.meta.updateTag({
          name: 'description',
          content: this.page.meta_description,
        });
      });
      // Display version number in 'About' page only
      this.slugPage == this.quiSommesNous ? (this.version = packageJson.version) : (this.version = '');
    });
  }
}

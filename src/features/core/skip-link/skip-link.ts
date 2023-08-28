import { TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type SkipLink = {
  fragment: string;
  content: TemplateRef<unknown>;
  route: ActivatedRoute;
};

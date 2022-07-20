import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;

  public constructor(private readonly router: Router) {}

  public navigateList() {
    this.router.navigate(['cartographie']);
  }
}

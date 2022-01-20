import { Component } from '@angular/core';

@Component({
  selector: 'app-administred-structures',
  templateUrl: './administred-structures.component.html',
  styleUrls: ['./administred-structures.component.scss'],
})
export class AdministredStructuresComponent {
  public structures: any;

  public agInit(params: any): void {
    this.structures = params;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
})
export class DeleteUserComponent {
  public params: any;
  public label: string;

  public agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  public onClick(): void {
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params);
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-web-and-social-network',
  templateUrl: './structure-web-and-social-network.component.html',
  styleUrls: ['./structure-web-and-social-network.component.scss'],
})
export class StructureWebAndSocialNetworkComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() showSocialNetwork: boolean;
  @Input() showWebsite: boolean;
  @Output() toggleWebsite = new EventEmitter<any>();
  @Output() toggleSocials = new EventEmitter<any>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public toggleSocialNetwork() {
    this.toggleSocials.emit();
  }

  public toggleWebSite() {
    this.toggleWebsite.emit();
  }

  public setValidationsForm(): void {
    this.validateForm.emit();
  }
}

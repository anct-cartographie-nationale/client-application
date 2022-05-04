import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator-form',
  templateUrl: './validator-form.component.html',
  styleUrls: ['./validator-form.component.scss']
})
export class ValidatorFormComponent implements OnInit {
  @Input() public control: FormControl;
  @Input() public nameControl?: string;
  public errorPattern = 'Champ mal renseigné';
  public errorMustMatch = 'Champ non identique';
  constructor() {}

  ngOnInit() {
    if (this.nameControl == 'password') {
      this.errorPattern =
        'Le mot de passe doit avoir au minimun 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
      this.errorMustMatch = 'Les mots de passe doivent être identiques';
    }
  }
}

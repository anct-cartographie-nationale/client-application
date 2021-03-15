import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-publish',
  templateUrl: './post-publish.component.html',
  styleUrls: ['./post-publish.component.scss'],
})
export class PostPublishComponent implements OnInit {
  @Output() closePublish = new EventEmitter<boolean>();
  constructor() {}
  public bodyMail =
    "Bonjour,%0D Je souhaite ajouter cette publication sur Rés'in :%0D- Titre :%0D- Texte :%0D- Auteur :%0D- Image : à joindre en pièce jointe";
  ngOnInit(): void {}

  public backToPosts(): void {
    this.closePublish.emit(true);
  }
}

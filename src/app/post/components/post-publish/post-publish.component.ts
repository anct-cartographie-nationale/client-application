import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-publish',
  templateUrl: './post-publish.component.html',
  styleUrls: ['./post-publish.component.scss'],
})
export class PostPublishComponent {
  @Output() closePublish = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute, private router: Router) {}
  public bodyMail =
    "Bonjour,%0D Je souhaite ajouter cette publication sur Rés'in :%0D- Titre :%0D- Texte :%0D- Auteur :%0D- Image : à joindre en pièce jointe";

  public backToPosts(): void {
    this.closePublish.emit(true);
    this.router.navigate(['items'], { relativeTo: this.route });
  }
}

import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss'],
})
export class LegalNoticeComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: "Mentions légales de Rés'IN, le Réseau des acteurs de l'inclusion numérique de la métropole de Lyon",
    });
  }
}

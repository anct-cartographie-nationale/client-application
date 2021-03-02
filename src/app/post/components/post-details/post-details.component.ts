import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  postId: string;
  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.postId);
  }
}

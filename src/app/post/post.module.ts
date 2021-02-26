import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostHeaderComponent } from './components/post-header/post-header.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostComponent, PostHeaderComponent, PostListComponent, PostDetailsComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule],
})
export class PostModule {}

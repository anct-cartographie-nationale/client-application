import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostPublishComponent } from './components/post-publish/post-publish.component';
import { NewsComponent } from './news.component';
import { TagResolver } from './resolvers/tags.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    resolve: {
      tags: TagResolver,
    },
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'details/:id',
        component: PostDetailsComponent,
      },
      {
        path: 'publish',
        component: PostPublishComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostService) {
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((post: Post[]) => {
      this.posts = post;
    });
  }
  deletePost(postId: string ) {
    this.postsService.deletePosts( postId );
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

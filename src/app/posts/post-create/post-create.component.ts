import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {PostService} from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public post: Post;
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostService, public route: ActivatedRoute) {  }

  ngOnInit() {
      this.route.paramMap.subscribe( (data: ParamMap) => {
        if ( data.has('postId' ) ) {
          this.mode = 'edit';
          this.postId = data.get( 'postId');
          this.post = this.postsService.getPost(this.postId);
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }
  onSavePost(form: NgForm) {
    if ( form.invalid) {
      return;
    }

    if ( this.mode === 'create') {
      this.postsService.addPosts(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }

}

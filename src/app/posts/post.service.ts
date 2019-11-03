import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
    .get<{message: string, posts: any }>('http://localhost:3300/api/posts')
    .pipe(map( (postsData) => {
      return postsData.posts.map( (data) => {
        return {
          title: data.title,
          content: data.content,
          id: data._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener()  {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return {...this.posts.find(pId => pId.id === id)};
  }
  addPosts(title: string, content: string) {
    const post: Post = {id: null, title, content};

    this.httpClient.post<{message: string, postId: string}>( 'http://localhost:3300/api/posts', post)
      .subscribe((response) => {
        post.id = response.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }

  updatePost ( id: string, title: string, content: string) {
    const post: Post = {id, title, content };
    this.httpClient.put(
      'http://localhost:3300/api/posts/' + id, post
    ).subscribe( response => console.log( response ));
  }

  deletePosts( postId: string ) {
    this.httpClient.delete( 'http://localhost:3300/api/posts/' + postId)
    .subscribe(( response ) => {
      const updatedPost = this.posts.filter( posts => posts.id != postId );
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
    });
  }
}

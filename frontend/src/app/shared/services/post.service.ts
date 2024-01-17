import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostNullable } from '../models/PostNullable.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public constructor(private httpClient: HttpClient) {}

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('api/posts');
  }

  public createPost(post: PostNullable): Observable<Post> {
    return this.httpClient.post<Post>('api/posts', post);
  }

  public updatePost(post: PostNullable): Observable<Post> {
    return this.httpClient.put<Post>('api/posts/' + post.id, post);
  }

  public getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>('api/posts/' + id);
  }

  public deletePostById(id: string): Observable<string> {
    return this.httpClient.delete('api/posts/' + id, { responseType: 'text' });
  }
}

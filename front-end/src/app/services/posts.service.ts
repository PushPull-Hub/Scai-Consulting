import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { FriendsService } from './friends.service';
import { UserServices } from './user.service';

import { Post } from '../models/Post.model';
import { PostComment as Comment } from '../models/PostComment.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // theUserFriendList: Friend[] = this.friendService.theUserFriendsList;
  UserFriendsPosts: Post[];
  hasBeenLiked: boolean = false;

  constructor(
    private authService: AuthService,
    private friendService: FriendsService,
    private userService: UserServices,
    private http: HttpClient
  ) {}

  getPostById(postId: number) {
    this.http
      .get<Post>(environment.rootUrl + '/api/posts/post/' + postId)
      .subscribe((responseDate) => console.log(responseDate));
  }

  getUserPosts() {
    return this.http.get<Post[]>(environment.rootUrl + '/api/posts');
  }

  createPost(post: Post) {
    this.http
      .post(environment.rootUrl + '/api/posts', post)
      .subscribe((responseDate) => console.log(responseDate));
  }

  updatePost(post: Post) {
    this.http
      .put(environment.rootUrl + '/api/posts', post)
      .subscribe((responseDate) => console.log(responseDate));
  }

  deletePost(postId: number) {
    this.http
      .delete(environment.rootUrl + '/api/posts/' + postId)
      .subscribe((responseDate) => console.log(responseDate));
  }

  commentOnPost(comment: Comment) {
    return this.http.post<Comment>(
      environment.rootUrl + `{/api/posts/${comment.postId}/comments}`,
      comment
    );
  }
}

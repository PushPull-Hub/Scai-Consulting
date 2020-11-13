import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { FriendsService } from './friends.service';
import { UserServices } from './user.service';

import { Post } from '../models/Post.model';
import { Friend } from '../models/Friend.model';
import { PostComment as Comment } from '../models/PostComment.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Post[] = JSON.parse(localStorage.getItem('Posts')) || [];

  theUserFriendList: Friend[] = this.friendService.theUserFriendsList;
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
    this.http
      .post(environment.rootUrl + '/api/posts/' + 23, comment)
      .subscribe((responseDate) => console.log(responseDate));
  }

  getPostComments(postId: number) {
    this.http
      .get(environment.rootUrl + '/api/posts/' + postId)
      .subscribe((responseDate) => console.log(responseDate));
  }
}

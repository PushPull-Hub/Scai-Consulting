import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { FriendsService } from './friends.service';

import { Post } from '../models/Post.model';
import { Friend } from '../models/Friend.model';
import { UserServices } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Post[] = JSON.parse(localStorage.getItem('Posts')) || [];
  loggedUserId: string = this.authService.loggedUserId;
  theUserFriendList: Friend[] = this.friendService.theUserFriendsList;
  UserFriendsPosts: Post[] = [];
  loggedUserName: string = this.userService.getaUserProperty(
    this.loggedUserId,
    'username'
  );
  hasBeenLiked: boolean = false;
  commenterName: string;

  constructor(
    private authService: AuthService,
    private friendService: FriendsService,
    private userService: UserServices
  ) {}

  getPosts(): Post[] {
    return JSON.parse(localStorage.getItem('Posts')) || [];
  }

  getPostById = (id: string): Post =>
    this.posts.find((post) => post.postId === id);

  getUserPost(): Post[] {
    const List: Post[] = [];
    JSON.parse(localStorage.getItem('Posts')).map((post) => {
      post.userId === this.loggedUserId && List.push(post);
    });
    return List;
  }

  getaPostProperty(postId: string, property: string): any {
    const post: Post = this.getPostById(postId);
    return post[`${property}`];
  }

  getUserFriendsPosts(): Post[] {
    const List: Post[] = [];
    this.userService
      .getaUserProperty(this.authService.loggedUserId, 'friends')
      .map((friend: Friend) => {
        JSON.parse(localStorage.getItem('Posts')).map(
          (post: Post) => post.userId === friend.id && List.push(post)
        );
      });
    this.UserFriendsPosts = List;
    return this.UserFriendsPosts;
  }

  createPost = (post: Post) => {
    const posts = this.getPosts();
    posts.push(post);
    this.posts = posts;
    localStorage.setItem('Posts', JSON.stringify(this.posts));
  };

  updatePost(id: string, key: string, newValue: any) {
    const post = this.getPostById(id);
    post[`${key}`] = newValue;
    const indexOfPost = this.posts.map((x) => x.postId).indexOf(id);
    this.posts.splice(indexOfPost, 1, post);
    localStorage.setItem('Posts', JSON.stringify(this.posts));
  }

  likePost(id: string) {
    const post = this.getPostById(id);
    if (this.hasBeenLiked) {
      if (post.likes > 0) {
        this.updatePost(post.postId, 'likes', post.likes - 1);
        this.hasBeenLiked = false;
      }
    } else {
      this.updatePost(post.postId, 'likes', post.likes + 1);
      this.hasBeenLiked = true;
    }
  }

  commentOnaPost(from: string, postId: string, comment: string) {
    const post = this.getPostById(postId);
    const postComments: string[] = post.comments;
    postComments.push(comment);

    this.updatePost(post.postId, 'comments', postComments);
    this.commenterName = this.userService.getaUserProperty(from, 'username');
  }
}

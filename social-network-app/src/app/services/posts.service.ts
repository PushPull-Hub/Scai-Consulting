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

  theUserFriendList: Friend[] = this.friendService.theUserFriendsList;
  UserFriendsPosts: Post[];
  hasBeenLiked: boolean = false;

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
      post.userId === this.authService.loggedUser.id && List.push(post);
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
      .getaUserProperty(this.authService.loggedUser.id, 'friends')
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

  likePost(id: string): number {
    const post = this.getPostById(id);
    if (this.hasBeenLiked) {
      if (post.likes > 0) {
        this.updatePost(post.postId, 'likes', post.likes - 1);
        this.hasBeenLiked = false;
        post.likes - 1;
      }
    } else {
      this.updatePost(post.postId, 'likes', post.likes + 1);
      this.hasBeenLiked = true;
      post.likes + 1;
    }
    return post.likes;
  }

  commentOnaPost(postId: string, comment: string) {
    const post = this.getPostById(postId);
    const postComments = post.comments;
    const _comment = {
      commenterId: this.authService.getLoggedUserId(),
      comment: comment,
    };
    postComments.push(_comment);
    this.updatePost(post.postId, 'comments', postComments);
    return postComments;
    // this.commenterName = this.userService.getaUserProperty(from, 'username');
  }
}

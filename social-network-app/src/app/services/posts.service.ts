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
  loggedUserId: number = this.authService.loggedUserId;
  theUserFriendList: Friend[] = this.friendService.theUserFriendsList;
  UserFriendsPosts: Post[] = [];
  loggedUserName: string = this.userService.getaUserProperty(
    this.loggedUserId,
    'username'
  );

  constructor(
    private authService: AuthService,
    private friendService: FriendsService,
    private userService: UserServices
  ) {}

  getPosts(): Post[] {
    return this.posts;
  }

  getUserPost(): Post[] {
    const List: Post[] = [];
    this.posts.map((post) => {
      post.userId === this.loggedUserId && List.push(post);
    });
    console.log(List);
    return List;
  }

  getUserFriendsPosts(): Post[] {
    const List: Post[] = [];
    this.theUserFriendList.map((friend: Friend) => {
      this.posts.find(
        (post: Post) => post.userId === friend.id && List.push(post)
      );
    });
    this.UserFriendsPosts = List;
    return this.UserFriendsPosts;
  }

  addPost = (post: Post) => {
    const posts = this.getPosts();
    posts.push(post);
    this.posts = posts;
    localStorage.setItem('Posts', JSON.stringify(this.posts));
  };
}

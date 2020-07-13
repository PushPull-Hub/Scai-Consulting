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

  constructor(
    private authService: AuthService,
    private friendService: FriendsService,
    private userService: UserServices
  ) {}

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

  addPost = () => {};
}

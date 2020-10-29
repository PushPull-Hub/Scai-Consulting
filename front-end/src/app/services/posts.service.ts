import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { FriendsService } from './friends.service';

import { Post } from '../models/Post.model';
import { Friend } from '../models/Friend.model';
import { UserServices } from './user.service';
type Liker = { id: string };

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

    localStorage.setItem('Posts', JSON.stringify(this.posts));
  }

  getPostLikers(id: string): Liker[] {
    const _post = this.getPostById(id);
    if (_post.likes) {
      return _post.likes;
    } else {
      return new Array<Liker>();
    }
  }

  reactOnPost(id: string): Liker[] {
    if (this.getPostLikers(id).length > 0) {
      const isLikedByMe = this.getPostLikers(id).find(
        (liker) => liker.id == this.authService.loggedUser.id
      );
      if (isLikedByMe) {
        return this.unlikePost(id);
      } else {
        return this.likePost(id);
      }
    } else {
      return this.likePost(id);
    }
  }

  likePost(id: string): Liker[] {
    const likers = this.getPostLikers(id);

    const me = { id: this.authService.loggedUser.id };
    likers.push(me);

    this.updatePost(id, 'likes', likers);
    return likers;
  }

  unlikePost(id: string): Liker[] {
    const likers = this.getPostLikers(id);

    const newArrayOflikers = likers.filter(
      (liker) => liker.id != this.authService.loggedUser.id
    );

    this.updatePost(id, 'likes', newArrayOflikers);
    return newArrayOflikers;
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
  }
}

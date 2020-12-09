import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';

import { Post } from 'src/app/models/Post.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { PostComment } from 'src/app/models/PostComment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() likeButtonClicked = new EventEmitter();
  @Output() addCommentButtonClicked = new EventEmitter<PostComment>();

  commentButtonClicked: boolean;
  textInputed: string;

  isLikedByMe: boolean;
  owner: MiniProfile = null;
  commenters: MiniProfile[] = null;

  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.commentButtonClicked = false;
    this.isLikedByMe = this._checkIfItsLikedByMe();
    this._getPostOwnerProfile(this.post.userId).then(
      (profile) => (this.owner = profile)
    );
  }

  whenCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }

  addComment() {
    const _comment = new PostComment();
    _comment.createdTime = '123456789';
    _comment.postId = this.post.id;
    _comment.comment = this.textInputed;
    this.addCommentButtonClicked.emit(_comment);
    this.textInputed = '';
  }

  reactOnPost() {
    this.likeButtonClicked.emit(this.post.id);
    this.isLikedByMe = !this.isLikedByMe;
  }

  _checkIfItsLikedByMe(): boolean {
    if (this.post.likerIds) {
      let authenticatedUserId: number;
      this.authService
        .getAuthenticatedUser()
        .then((user) => (user.id = authenticatedUserId));
      return this.post.likerIds.find((likerObject) => {
        likerObject.likersId == authenticatedUserId;
      })
        ? true
        : false;
    } else return false;
  }

  _getPostOwnerProfile(OwnerId: number): Promise<MiniProfile> {
    return new Promise((resolve, reject) => {
      this.userService
        .getMiniProfile(OwnerId)
        .subscribe((profile) => resolve(profile));
    }).then((profile: MiniProfile) => {
      return profile;
    });
  }
}

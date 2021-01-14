import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';

import { Post } from 'src/app/models/Post.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { PostComment } from 'src/app/models/PostComment.model';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { User } from 'src/app/models/User.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() addCommentButtonClicked = new EventEmitter<PostComment>();

  @Output() like = new EventEmitter();
  @Output() unlike = new EventEmitter();

  @Input() canOpenPostModel: boolean;

  commentButtonClicked: boolean;
  textInputed: string;

  imageUrl: string;

  authenticatedUser: User;

  isLikedByMe: boolean;
  postedOn;
  owner: MiniProfile = null;

  postOwnerProfilePicture: string;

  commenters: MiniProfile[] = null;

  constructor(
    private userService: UserServices,
    private authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.isLikedByMe = null;
    this._checkIfItsLikedByMe();
    this.imageUrl = this.post.imageUrl;
    this.postedOn = this.getdate(parseInt(this.post.created_time));
    this.commentButtonClicked = false;
    this.getPostOwner();
  }

  private getPostOwner() {
    this._getPostOwnerProfile(this.post.userId).then((profile) => {
      this.owner = profile;
      this.owner.profilePictureUrl
        ? (this.postOwnerProfilePicture = this.owner.profilePictureUrl)
        : (this.postOwnerProfilePicture = environment.male_avatar_photo_url);
    });
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
    if (this.isLikedByMe) {
      this.unlike.emit(this.post.id);
      this.isLikedByMe = !this.isLikedByMe;
    } else {
      this.like.emit(this.post.id);
      this.isLikedByMe = !this.isLikedByMe;
    }
  }

  async _checkIfItsLikedByMe() {
    const doesPostHasLikes: boolean =
      this.post.likersIds.length > 0 ? true : false;
    const authenticatedUserId: number = this.authenticatedUser
      ? this.authenticatedUser.id
      : await this.authService.getAuthenticatedUser().then((user) => {
          this.authenticatedUser = user;
          return user.id;
        });
    if (doesPostHasLikes) {
      this.isLikedByMe = this.post.likersIds.find((liker) => {
        return liker.likersId == authenticatedUserId;
      })
        ? true
        : false;
    } else {
      this.isLikedByMe = false;
    }
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

  getdate(unixTime: any) {
    return moment(unixTime).subtract(10, 'days').calendar();
  }

  open(content) {
    if (this.canOpenPostModel) {
      this.modalService.open(content);
    } else {
      null;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FriendShip } from 'src/app/models/FriendShip.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { Post } from 'src/app/models/Post.model';
import { PostComment } from 'src/app/models/PostComment.model';
import { PostLike } from 'src/app/models/PostLike.model';
import { AuthService } from 'src/app/services/auth.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ImagesService } from 'src/app/services/images.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserServices } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  loading: boolean = true;

  profile: MiniProfile;
  profilePicture: string;
  id: number;

  relationShipStatus: string;

  posts: Post[];
  doProfileHasPosts: boolean;
  loadingPosts: boolean;
  sortedPosts: Post[];

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private userService: UserServices,
    private authService: AuthService,
    private router: Router,
    private friendService: FriendsService,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.loadProfile();
  }

  async loadProfile() {
    this.loading = true;
    await this.authService.getAuthenticatedUser().then((user) => {
      if (user.id === this.id) {
        this.router.navigate([
          `/profile/${user.firstName}.${user.lastName}/${user.id}`,
        ]);
      } else {
        this.userService
          .getMiniProfile(this.id)
          .toPromise()
          .then(async (profile: MiniProfile) => {
            if (profile && profile.id) {
              this.profile = profile;
              this.profilePicture = this.imageService.getFriendProfilePictureUrl(
                this.profile
              );
              this.loadPosts(profile.id);
              await this.loadOurRelationShip().then((result) => {
                console.log(result);
                this.loading = false;
              });
            } else {
              this.router.navigate(['/home']);
            }
          });
      }
    });
  }

  loadPosts(profileId: number) {
    console.log('load posts fired');

    this.loadingPosts = true;
    this.postService
      .getProfilePosts(profileId)
      .toPromise()
      .then((result) => {
        if (result && result.length > 0) {
          console.log(result);
          this.posts = result;
          this.doProfileHasPosts = true;
          this.loadingPosts = false;
        } else {
          this.loadingPosts = false;
          this.doProfileHasPosts = false;
        }
      });
  }

  loadOurRelationShip() {
    return new Promise((res, rej) => {
      this.friendService
        .getRelation(this.id)
        .toPromise()
        .then((result: FriendShip) => {
          if (result) {
            if (result.status == 0 && result.actionUserId !== this.id) {
              this.relationShipStatus = 'a';
              console.log('I sent');
            } else if (result.status == 0 && result.actionUserId == this.id) {
              console.log('he sent');
              this.relationShipStatus = 'b';
            } else if (result.status == 1) {
              this.relationShipStatus = 'c';
              console.log('we are friends ');
            } else if (result.status == 2 && result.actionUserId !== this.id) {
              this.relationShipStatus = 'f';
              console.log(' no relation ');
            } else if (result.status == 3 && result.actionUserId == this.id) {
              this.relationShipStatus = 'd';
              console.log(' he blocked');
            } else if (result.status == 3 && result.actionUserId !== this.id) {
              this.relationShipStatus = 'e';
              console.log(' i blocked');
            }
          } else {
            this.relationShipStatus = 'f';
            console.log(' no relation ');
          }
          res(this.relationShipStatus);
        });
    });
  }

  sendFriendsRequest(userId: number) {
    this.friendService
      .sendFriendRequest(userId)
      .toPromise()
      .then((result) => {
        if (result) {
          console.log(result);
          this.relationShipStatus = 'a';
        } else console.log('check conditions ');
      });
  }

  acceptFriendRequest(requestorId: number) {
    this.friendService
      .acceptFriendRequest(requestorId)
      .subscribe((result: FriendShip) => {
        if (result) {
          console.log(result);
          this.relationShipStatus = 'c';
        } else console.log('check conditions ');
      });
  }

  declineFriendRequest(requestorId: number) {
    this.friendService.declineFriendRequest(requestorId).subscribe((result) => {
      if (result) {
        console.log(result);
        this.relationShipStatus = 'f';
      } else console.log('check the conditions ');
    });
  }

  cancelFriendRequest(requestedUserId) {
    this.friendService
      .cancelFriendRequest(requestedUserId)
      .subscribe((result: boolean) => {
        if (result) {
          console.log(result);
          this.relationShipStatus = 'f';
        } else console.log('check conditions ');
      });
  }

  blockFriend(friendId: number) {
    this.friendService
      .blockFriend(friendId)
      .toPromise()
      .then((result) => {
        console.log(result);
        if (result) {
          this.relationShipStatus = 'e';
        } else console.log('check conditions ');
      });
  }

  unblockFriend(friendId: number) {
    this.friendService
      .unblockFriend(friendId)
      .toPromise()
      .then((result) => {
        console.log(result);
        if (result) {
          this.relationShipStatus = 'c';
        } else console.log('check conditions ');
      });
  }

  unFriend(friendId: number) {
    this.friendService
      .unFriend(friendId)
      .toPromise()
      .then((result) => {
        if (result) {
          console.log(result);
          this.relationShipStatus = 'f';
        } else console.log('check conditions ');
      });
  }

  likePost(id: number) {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index != -1) {
      this.postService
        .likePost(id)
        .subscribe(
          (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
        );
    } else {
      console.log('check conditions  ');
    }
  }

  unlikePost(id: number) {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index != -1) {
      this.postService
        .unlikePost(id)
        .subscribe(
          (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
        );
    } else {
      console.log('check conditions  ');
    }
  }

  addCommentOnPost(comment: PostComment) {
    const index = this.posts.findIndex((post) => post.id == comment.postId);
    if (index != -1) {
      this.postService.commentOnPost(comment).subscribe((responseData) => {
        if (responseData.id) this.posts[index].comments.push(responseData);
      });
    }
  }

  // enum Status {
  //   Pending = 0,
  //   Accepted = 1,
  //   Declined = 2,
  //   Blocked = 3,
  // }

  // a - I sent
  // c - we are friends
  // d - he blocked
  // e - I  blocked
  // f - no relation
}

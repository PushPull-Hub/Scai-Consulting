import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FriendShip } from 'src/app/models/FriendShip.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { Post } from 'src/app/models/Post.model';
import { PostComment } from 'src/app/models/PostComment.model';
import { PostLike } from 'src/app/models/PostLike.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserServices } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  male_avatar_photo_url: string;
  loading: boolean = true;
  profile: MiniProfile;
  id: number;

  relationShipStatus: string;

  posts: Post[];
  doIhavePostsToShow: boolean;
  sortedPosts: Post[];

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private userService: UserServices,
    private authService: AuthService,
    private router: Router,
    private friendService: FriendsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
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

  loadOurRelationShip() {
    return new Promise((res, rej) => {
      this.friendService
        .getRelation(this.id)
        .toPromise()
        .then((result: FriendShip) => {
          console.log(result);
          console.log(this.id);

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

  // enum Status {
  //   Pending = 0,          a I sent / b he sent  , c friends , d he blocked , e i blocked , f no relation
  //   Accepted = 1,
  //   Declined = 2,
  //   Blocked = 3,
  // }

  // private loadPosts() {
  //   this.postService.getFriendsPosts().subscribe((posts) => {
  //     this.doIhavePostsToShow = true;
  //     setTimeout(() => {
  //       if (posts && posts.length > 0) {
  //         this.posts = posts;
  //         this.sortPostsByDate();
  //         this.doIhavePostsToShow = true;
  //         this.loading = false;
  //       } else {
  //         this.loading = false;
  //         this.posts = [];
  //         this.doIhavePostsToShow = false;
  //       }
  //     }, 600);
  //   });
  // }

  // addCommentOnPost(comment: PostComment) {
  //   const index = this.posts.findIndex((post) => post.id == comment.postId);
  //   if (index != -1) {
  //     this.postService.commentOnPost(comment).subscribe((responseData) => {
  //       if (responseData.id) this.posts[index].comments.push(responseData);
  //     });
  //   }
  // }

  // likePost(id: number) {
  //   const index = this.posts.findIndex((post) => post.id == id);
  //   if (index != -1) {
  //     this.postService
  //       .likePost(id)
  //       .subscribe(
  //         (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
  //       );
  //   } else {
  //     console.log('check conditions  ');
  //   }
  // }

  // unlikePost(id: number) {
  //   const index = this.posts.findIndex((post) => post.id == id);
  //   if (index != -1) {
  //     this.postService
  //       .unlikePost(id)
  //       .subscribe(
  //         (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
  //       );
  //   } else {
  //     console.log('check conditions  ');
  //   }
  // }

  // sortPostsByDate() {
  //   return (this.sortedPosts = this.posts.sort(
  //     (a, b) => parseInt(b.created_time) - parseInt(a.created_time)
  //   ));
  // }
}

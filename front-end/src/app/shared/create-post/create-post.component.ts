import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { PostsService } from 'src/app/services/posts.service';
import { ImagesService } from 'src/app/services/images.service';

import * as moment from 'moment';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  now: number;
  authenticatedUser: User;

  postImageSrc: string;
  locationIconClicked: boolean;

  selectedImage: any = null;
  insertedText: string;

  male_avatar_photo_url: string;
  profilePictureUrl: string;

  constructor(
    private authService: AuthService,
    private postService: PostsService,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.now = moment().valueOf();
    this.locationIconClicked = false;
    this.insertedText = null;
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.getAuthenticatedUserProfilePicture();
  }

  getAuthenticatedUserProfilePicture() {
    this.imagesService
      .getAuthenticatedUserProfilePicture()
      .then((pictureUrl) => {
        this.profilePictureUrl = pictureUrl;
      })
      .catch((err) => console.log(err));
  }

  sharePost() {
    if (this.insertedText && this.insertedText.trim() !== '') {
      const post = this.instantiatePostObject();
      if (this.selectedImage) {
        this.imagesService
          .uploadPostImageToFireBaseDb(this.selectedImage)
          .then((url) => {
            post.imageUrl = url;
            this.createPost(post);
          });
      } else {
        post.imageUrl = null;
        this.createPost(post);
      }
      this.insertedText = '';
      this.selectedImage = null;
    } else if (this.selectedImage) {
      const post = this.instantiatePostObject();
      this.imagesService
        .uploadPostImageToFireBaseDb(this.selectedImage)
        .then((url) => {
          post.imageUrl = url;
          this.createPost(post);
        });
      this.insertedText = '';
      this.selectedImage = null;
    } else {
      console.log('text vuoto');
    }
  }

  private createPost(post: Post) {
    this.postService
      .createPost(post)
      .toPromise()
      .then((result: Post) => {
        if (result.id) {
          this.postService.myPosts.unshift(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private instantiatePostObject() {
    const post = new Post();
    post.created_time = this.now.toString();
    post.description = this.insertedText;
    post.canComment = 1;
    post.canShare = 1;
    post.pubblico = 1;
    post.place = '';
    return post;
  }

  onLocationIconClick() {
    this.locationIconClicked = !this.locationIconClicked;
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.postImageSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.postImageSrc = environment.male_avatar_photo_url;
      this.selectedImage = null;
    }
  }
}

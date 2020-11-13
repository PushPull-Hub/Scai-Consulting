import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/models/Profile.model';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  now: number;
  insertedText: string;
  locationIconClicked: boolean;
  selectedFile: File;
  male_avatar_photo_url: string;

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.now = moment().valueOf();
    this.locationIconClicked = false;
    this.selectedFile = null;
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }

  sharePost() {
    const post = new Post();
    const profile = new Profile();
    if (this.insertedText && this.insertedText.trim() !== '') {
      post.createdTime = this.now.toString();
      post.description = this.insertedText;
      post.canComment = 1;
      post.canShare = 1;
      post.ispublic = 1;
      post.place = '';
      post.objectId = null;
      profile.id = 15; // temporary
      post.profile = profile;
      this.insertedText = '';
      this.postService.createPost(post);
    } else {
      console.log('text vuoto');
      // will change the button style or the button ability
    }
  }

  onLocationIconClick() {
    this.locationIconClicked = !this.locationIconClicked;
  }

  onFileSelected(event) {
    // this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onUploadFile() {
    // onUploadFile method
  }
}

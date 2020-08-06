import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { UserServices } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postText: string;
  date = new Date();
  now = moment().format('Do MMMM YYYY');
  locationIconClicked: boolean = false;
  selectedFile: File = null;

  constructor(private postService: PostsService,
    private authService: AuthService,
    private userService: UserServices) {

  }

  ngOnInit(): void {
  }

  sharePost() {
    const post = new Post();
    post.userId = this.authService.loggedUser.id;
    post.postId = uuidv4();
    post.text = this.postText;
    post.description = '';
    post.comments = [{ commenterId: '', comment: '' }];
    post.likes = 0;
    post.image = [];
    post.created_time = this.now;
    post.location = '';
    post.can_reply = true;
    post.can_share = true;
    post.is_hidden = false;
    this.postText = '';
    this.postService.createPost(post);
  }

  onLocationIconClick() {
    this.locationIconClicked = !this.locationIconClicked;
  }

  onFileSelected(event) {
    // this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onUploadFile() { }

}

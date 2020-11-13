import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { PostComment } from 'src/app/models/PostComment.model';
import { Profile } from 'src/app/models/Profile.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    // this.postService.getPostById('22');
    // this.postService.deletePost(32);
    // this.postService.getPostComments(23);
    // const comment = new PostComment();
    // comment.comment = "that's a comment from Angular App";
    // comment.createdTime = '123';
    // const profile = new Profile();
    // profile.id = 15;
    // comment.profile = profile;
    // this.postService.commentOnPost(comment);
  }
}

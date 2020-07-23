import { Component, OnInit, Input } from '@angular/core';

import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.scss'],
})
export class TimelinePostsComponent implements OnInit {
  Userposts: Post[] = this.postsService.getUserPost();
  userName: String = this.authService.loggedUser.username;
  commentButtonClicked: boolean = false;
  comments: string[];

  now = moment().hour();

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }

  onLikeButtonClicked(id: string) {
    this.postsService.likePost(id);
  }

  sortPosts = (a: Post, b: Post) =>
    new Date(a.created_time).getTime() - new Date(b.created_time).getTime();
}

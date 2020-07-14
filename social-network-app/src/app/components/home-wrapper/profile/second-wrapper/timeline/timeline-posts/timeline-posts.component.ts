import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.scss'],
})
export class TimelinePostsComponent implements OnInit {
  Userposts: Post[] = this.postsService.getUserPost();
  userName: String = this.authService.theLoggedUserName;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

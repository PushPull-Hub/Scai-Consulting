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

  ngOnInit(): void {}
}

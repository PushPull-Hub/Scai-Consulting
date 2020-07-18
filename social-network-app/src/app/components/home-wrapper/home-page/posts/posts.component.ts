import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../../services/posts.service';

import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostsService) {}
  posts: Post[] = this.postService.getUserFriendsPosts();
  loading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 800);
    this.loading = true;
  }
}

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
  posts: Post[];
  loading: boolean = false;

  ngOnInit(): void {}

  getUserFriendPosts(): Post[] {
    return this.postService.getUserFriendsPosts();
  }

  sortPosts = (a: Post, b: Post) =>
    new Date(b.created_time).getTime() - new Date(a.created_time).getTime();

  LikePost(event: Event) {
    console.log('the passed event is : ' + event);
  }

  addCommentOnPost(event) {
    console.log('the passed event from child was :' + event);
  }
}

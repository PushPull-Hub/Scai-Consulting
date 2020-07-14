import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postText: string;
  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  sharePost() {
    const post = new Post();
    post.userId = this.authService.loggedUserId;
    post.text = this.postText;
    post.description = '';
    post.comments = [''];
    post.likes = '';
    post.image = [];
    this.postText = '';
    this.postService.addPost(post);
  }
}

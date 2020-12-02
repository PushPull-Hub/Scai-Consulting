import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostComment } from 'src/app/models/PostComment.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  loading: boolean = true;

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getUserPosts().subscribe((posts) => {
      setTimeout(() => {
        this.posts = posts;
        this.loading = false;
      }, 600);
    });
  }

  reactOnPost(id) {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index != -1) {
      // this.posts[index].likerIds = this.postService.likePost(id);
      this.postService
        .likePost(id)
        .subscribe((likerIds) => (this.posts[index].likerIds = likerIds));
    }
  }

  addCommentOnPost(comment: PostComment) {
    const index = this.posts.findIndex((post) => post.id == comment.postId);
    if (index != -1) {
      this.postService.commentOnPost(comment).subscribe((responseData) => {
        if (responseData.id) this.posts[index].comments.push(responseData);
      });
    }
  }
}

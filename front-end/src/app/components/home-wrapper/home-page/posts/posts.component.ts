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
  loading: boolean = false;

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getUserPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    });
  }

  // reactOnPost(id) {
  //   const index = this.posts.findIndex((post) => post.id == id);
  //   if (index != -1) {
  //     this.posts[index].likes = this.postService.reactOnPost(id);
  //   }
  // }

  addCommentOnPost(comment: PostComment) {
    const index = this.posts.findIndex((post) => post.id == comment.postId);
    if (index != -1) {
      this.postService.commentOnPost(comment).subscribe((responseData) => {
        if (responseData.id) this.posts[index].comments.push(responseData);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
type CustomComment = { postId: string; commentText: string };

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
    this.posts = this.postService.getUserFriendsPosts();
    console.table(this.postService.getUserFriendsPosts());
  }

  LikePost(id) {
    this.postService.likePost(id);
  }

  addCommentOnPost(comment: CustomComment) {
    const index = this.posts.findIndex((post) => post.postId == comment.postId);
    const loggedUserId: string = this.authService.loggedUser.id;
    if (index != -1) {
      this.posts[index].comments.push({
        commenterId: loggedUserId,
        comment: comment.commentText,
      });
    }
  }
}

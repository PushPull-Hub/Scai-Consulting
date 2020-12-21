import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostComment } from 'src/app/models/PostComment.model';
import { PostLike } from 'src/app/models/PostLike.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  loading: boolean = true;
  doIhavePostsToShow: boolean;
  sortedPosts: Post[];

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getFriendsPosts().subscribe((posts) => {
      this.doIhavePostsToShow = true;
      setTimeout(() => {
        if (posts && posts.length > 0) {
          this.posts = posts;
          this.sortPostsByDate();
          this.doIhavePostsToShow = true;
          this.loading = false;
        } else {
          this.loading = false;
          this.posts = [];
          this.doIhavePostsToShow = false;
        }
      }, 600);
    });
  }

  addCommentOnPost(comment: PostComment) {
    const index = this.posts.findIndex((post) => post.id == comment.postId);
    if (index != -1) {
      this.postService.commentOnPost(comment).subscribe((responseData) => {
        if (responseData.id) this.posts[index].comments.push(responseData);
      });
    }
  }

  likePost(id: number) {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index != -1) {
      this.postService
        .likePost(id)
        .subscribe(
          (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
        );
    } else {
      console.log('check conditions  ');
    }
  }

  unlikePost(id: number) {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index != -1) {
      this.postService
        .unlikePost(id)
        .subscribe(
          (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
        );
    } else {
      console.log('check conditions  ');
    }
  }

  sortPostsByDate() {
    return (this.sortedPosts = this.posts.sort(
      (a, b) => parseInt(b.created_time) - parseInt(a.created_time)
    ));
  }
}

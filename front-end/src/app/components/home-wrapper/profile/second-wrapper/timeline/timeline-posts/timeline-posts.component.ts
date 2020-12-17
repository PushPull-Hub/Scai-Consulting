import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';

import { PostComment } from 'src/app/models/PostComment.model';
import { PostLike } from 'src/app/models/PostLike.model';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.scss'],
})
export class TimelinePostsComponent implements OnInit {
  posts: Post[];
  loading: boolean = true;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    if (this.postService.myPosts.length > 0) {
      setTimeout(() => {
        this.posts = this.postService.myPosts;
        this.loading = false;
      }, 600);
    } else {
      this.postService.getUserPosts().subscribe((posts) => {
        setTimeout(() => {
          this.posts = posts;
          this.postService.myPosts = posts;
          this.loading = false;
        }, 600);
      });
    }
  }

  // reactOnPost(id) {
  //   const index = this.posts.findIndex((post) => post.id == id);
  //   if (index != -1) {
  //     this.postService
  //       .likePost(id)
  //       .subscribe(
  //         (likerIds: PostLike[]) => (this.posts[index].likerIds = likerIds)
  //       );
  //   } else {
  //     console.log('check conditions  ');
  //   }
  // }

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

  addCommentOnPost(comment: PostComment) {
    const index = this.posts.findIndex((post) => post.id == comment.postId);
    if (index != -1) {
      this.postService.commentOnPost(comment).subscribe((responseData) => {
        if (responseData.id) this.posts[index].comments.push(responseData);
      });
    }
  }
}
